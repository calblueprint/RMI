class PortfoliosController < ApplicationController
  def index
    @portfolios = Portfolio.all
  end
  def show
    @portfolio = Portfolio.find(params[:id])
    @state = {
      buildings: ActiveModel::Serializer::CollectionSerializer.new(
        @portfolio.buildings, each_serializer: BuildingSerializer
      ),
      building_types: ActiveModel::Serializer::CollectionSerializer.new(
        BuildingType.all, each_serializer: BuildingTypeSerializer
      )
    }
  end

  ##
  # Exports a CSV file for each Building Type in the portfolio.
  # Each CSV header contains the parameters of each question in the portfolio.
  # Each row in a CSV file contains all the answers for a particular building
  # of that Building Type.
  #
  # References:
  # http://www.rubydoc.info/github/rubyzip/rubyzip/master/toplevel/
  # http://ruby-doc.org/stdlib-2.0.0/libdoc/tempfile/rdoc/Tempfile.html
  # http://thinkingeek.com/2013/11/15/create-temporary-zip-file-send-response-rails/
  # http://ruby-doc.org/stdlib-1.9.3/libdoc/fileutils/rdoc/FileUtils.html#method-c-mkdir_p
  #
  def download
    FileUtils.mkdir_p(Rails.root.join('tmp', 'zip'))

    portfolio = Portfolio.find(params[:id])
    filename = "#{Date.today}_portfolio_#{portfolio.name}".delete(' ')
    temp_zip = Tempfile.new("#{filename}.zip", Rails.root.join('tmp', 'zip'))

    begin
      # Initialize the temp file as a zip file
      Zip::OutputStream.open(temp_zip) { |zos| }
      
      # Add files to zip file
      Zip::File.open(temp_zip.path, Zip::File::CREATE) do |zip|
        # For building_type in building_types, create csv for that building type
        # if the query result is not empty
        BuildingType.find_each do |building_type|
          buildings = portfolio.buildings.where(building_type: building_type).all
          csv_name = "#{filename}_#{building_type.name}.csv".delete(' ')
          add_csv_to_zip(zip, csv_name, buildings, building_type) unless buildings.blank?
        end
      end

      # Read in the binary data of temp_zip and send to browser as attachment
      zip_data = File.read(temp_zip.path)
      send_data(zip_data, type: 'application/zip', filename: "#{filename}.zip")
    ensure
      # Close and delete temp_zip no matter what happens in the block
      temp_zip.close
      temp_zip.unlink
      # Copypasta to delete CSV files in tmp/zip directory
      FileUtils.rm_rf(Dir.glob(Rails.root.join('tmp', 'zip', '*')))
    end
  end
  helper_method :download

  private

  ##
  # Given a zip file object, a name, and a list of buildings of a given Building
  # Type, create a temporary CSV file with the given name. Populate the CSV with
  # the attributes of all the buildings. Then, add the CSV to the zip.
  # This function creates a tempfile, but it does not immediately delete the
  # file. Instead, deletion is postponed until the main function sends the zip
  # to the browser.
  #
  # References:
  # http://ruby-doc.org/stdlib-2.0.0/libdoc/csv/rdoc/CSV.html
  #
  def add_csv_to_zip(zip, csv_name, buildings, building_type)
    temp_csv = Tempfile.new(csv_name, Rails.root.join('tmp', 'zip'))

    begin
      # Create and populate CSV with given name
      CSV.open(temp_csv, 'wb') do |csv|
        # Add column headers to CSV
        csv << Building.column_names + building_type.questions.select(&:published?).map(&:text)
        # Add a row of building attribute values to the CSV for each building
        buildings.each do |building|
          csv << Building.column_names.map { |attr| building.send(attr) } + building_type.questions.select(&:published?).map{ |question| find_answer(question, building) }
        end
        zip.add(csv_name, csv.path)
      end
    end
  end

  ##
  # Given a question and a building, return the building's answer to that question
  # if available, or "N/A" otherwise.
  #
  def find_answer(question, building)
    answer = building.answers.find { |answer| answer.question.id == question.id }
    return answer.text unless answer.nil?
    return ' '
  end
end

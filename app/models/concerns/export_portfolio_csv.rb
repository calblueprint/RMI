class ExportPortfolioCSV
  def initialize(args)
    if args[:error]
      @errors = args[:error]
    else
      @portfolio = args[:portfolio]
    end
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
  def create_zip
    filename = "#{Date.today}_portfolio_#{@portfolio.name}".delete(' ')
    temp_zip = Tempfile.new("#{filename}.zip", Rails.root.join('tmp', 'zip'))

    # Initialize the temp file as a zip file
    Zip::OutputStream.open(temp_zip) { |zos| }

    # Add files to zip file
    Zip::File.open(temp_zip.path, Zip::File::CREATE) do |zip|
      # For building_type in building_types, create csv for that building type
      # if the query result is not empty
      BuildingType.find_each do |building_type|
        buildings = @portfolio.buildings.where(building_type: building_type).all
        csv_name = "#{filename}_#{building_type.name}.csv".delete(' ')
        add_csv_to_zip(zip, csv_name, buildings, building_type) unless buildings.blank?
      end
    end

    # Read in the binary data of temp_zip and send to browser as attachment
    zip_data = File.read(temp_zip.path)
    return zip_data, temp_zip, filename
  end

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
        csv << Building.column_names + building_type.questions.select(&:published?).map(&:parameter)
        # Add a row of building attribute values to the CSV for each building
        buildings.each do |building|
          row = Building.column_names
                         .map { |attr| building.send(attr) } \
                         + building_type
                           .questions.select(&:published?)
                           .map { |question| find_answer(question, building) }
          csv << row
        end
        zip.add(csv_name, csv.path)
      end
    end
  end

  ##
  # Given a question and a building, return the building's answer to that
  # question
  def find_answer(question, building)
    _answer = Answer.where(question_id: question.id, building_id: building.id).first
    answer =
    if _answer
      _answer.text
    else
      ''
    end
  end
end

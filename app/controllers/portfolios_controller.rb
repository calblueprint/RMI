class PortfoliosController < ApplicationController
  def show
    @portfolio = Portfolio.find(params[:id])
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
  # TODO: modularize everything. Make CSV file temporary too. 
  #
  def download
    portfolio = Portfolio.find(params[:id])
    filename = "#{Date.today}_portfolio_#{portfolio.name}".delete(' ')
    temp_file = Tempfile.new("#{filename}.zip")

    begin
      # Initialize the temp file as a zip file
      Zip::OutputStream.open(temp_file) { |zos| }

      # Add files to zip file
      Zip::File.open(temp_file.path, Zip::File::CREATE) do |zip|
        # for building_type in building_types, create csv for that building type
        # if the query result is not empty
        BuildingType.find_each do |building_type|
          buildings = portfolio.buildings.where(building_type: building_type).all
          unless buildings.blank?
            csv_name = "#{filename}_#{building_type.name}".delete(' ')
            # populate CSV
            CSV.open(csv_name, 'wb') do |csv|
              # add column headers to CSV
              csv << Building.column_names
              # add rows to CSV
              buildings.each do |building|
                csv << Building.column_names.map { |attr| building.send(attr) }
              end
              zip.add("#{csv_name}.csv", csv.path)
            end
          end
        end
      end

      # Read in the binary data of temp_file and send to browser as attachment
      zip_data = File.read(temp_file.path)
      send_data(zip_data, type: 'application/zip', filename: "#{filename}.zip")
    ensure
      # Close and delete temp_file
      temp_file.close
      temp_file.unlink
    end
  end
  helper_method :download
end

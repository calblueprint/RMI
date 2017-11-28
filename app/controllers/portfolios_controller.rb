class PortfoliosController < ApplicationController
  load_and_authorize_resource
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
  # Exports a CSV file for each Building Type in the portfolio. Creates and calls an
  # ExportPortfolioCSV class (found in app/models/concerns)
  #
  # References:
  # http://www.rubydoc.info/github/rubyzip/rubyzip/master/toplevel/
  # http://ruby-doc.org/stdlib-2.0.0/libdoc/tempfile/rdoc/Tempfile.html
  # http://thinkingeek.com/2013/11/15/create-temporary-zip-file-send-response-rails/
  # http://ruby-doc.org/stdlib-1.9.3/libdoc/fileutils/rdoc/FileUtils.html#method-c-mkdir_p
  #
  def download
    FileUtils.mkdir_p(Rails.root.join('tmp', 'zip'))

    begin
      args = {portfolio: @portfolio}
      zip_data, temp_zip, filename = ExportPortfolioCSV.new(args).create_zip
      send_data(zip_data, type: 'application/zip', filename: "#{filename}.zip")
    ensure
      # Close and delete temp_zip no matter what happens in the block
      temp_zip.close
      temp_zip.unlink
      # Copypasta to delete CSV files in tmp/zip directory
      FileUtils.rm_rf(Dir.glob(Rails.root.join('tmp', 'zip', '*.csv')))
    end
  end
  helper_method :download
end

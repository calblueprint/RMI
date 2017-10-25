class Api::PortfoliosController < ApplicationController
  def index
    @portfolios = Portfolio.all
    render json: @portfolios
  end

  def show
    portfolio = Portfolio.find(params[:id])
    render json: portfolio
  end

  ##
  # Creates a new portfolio tied to the currently logged-in asset manager's account.
  def create
    if asset_manager_signed_in?
      portfolio = current_asset_manager.portfolios.new(portfolio_params)
      if portfolio.save
        render_json_message(:ok, message: 'New portfolio created', data: portfolio)
      else
        render_json_message(:forbidden, data: portfolio, errors: portfolio.errors.full_messages)
      end
    else
      render_json_message(:forbidden, message: 'No asset manager is currently signed in')
    end
  end

  def update
    portfolio = Portfolio.find(params[:id])
    if portfolio.update(portfolio_params)
      render_json_message(:ok, message: 'Portfolio successfully updated', data: portfolio)
    else
      render_json_message(:forbidden, data: portfolio, errors: portfolio.errors.full_messages)
    end
  end

  ##
  # Exports a CSV file for each Building Type in the portfolio.
  # Each CSV header contains the parameters of each question in the portfolio.
  # Each row in a Building Type CSV file contains all the answers for a
  # particular building of that Building Type.
  # https://github.com/rubyzip/rubyzip
  # http://www.rubydoc.info/github/rubyzip/rubyzip/master/toplevel/
  # http://ruby-doc.org/stdlib-2.0.0/libdoc/tempfile/rdoc/Tempfile.html
  # http://thinkingeek.com/2013/11/15/create-temporary-zip-file-send-response-rails/
  def download
    portfolio = Portfolio.find(params[:id])
    filename = "#{Date.today}-portfolio-#{portfolio.name}"
    temp_file = Tempfile.new(filename)

    begin
      # Initialize the temp file as a zip file
      Zip::OutputStream.open(temp_file) { |zos| }

      # Add files to zip file
      Zip::File.open(temp_file.path, Zip::File::CREATE) do |zip|
        # TODO: put files in here
        # for building_type in building_types
        BuildingType.find_each do |type|
          buildings = portfolio.buildings.where(building_type: type).all
          CSV.open("#{filename}-#{type.name}")
        end
          # create csv for that building type if the query result is not empty
      end

      # Read in the binary data of temp_file and send to browser as attachment
      zip_data = File.read(temp_file.path)
      send_data(zip_data, type: 'application/zip', filename: "#{filename}+.zip")
    ensure
      # Close and delete temp_file
      temp_file.close
      temp_file.unlink
    end
  end

  private

  def portfolio_params
    params.require(:portfolio)
          .permit(
              :name,
              :asset_manager,
              :buildings
          )
  end
end

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
  def download
    portfolio = Portfolio.find(params[:id])

    temp_file = Tempfile.new "portfolio-#{portfolio.name}-#{Date.today}.zip"
    begin

    rescue

    ensure

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

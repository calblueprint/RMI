class Api::PortfoliosController < ApplicationController
  def index
    portfolios = Portfolio.all
    render json: portfolios
  end

  def show
    portfolio = Portfolio.find(params[:id])
    render json: portfolio
  end

  def create
    # Creates a new portfolio tied to the currently logged-in asset manager's account.
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

  private

  def portfolio_params
    params.require(:portfolio)
          .permit(
            :name,
            :asset_manager_id
          )
  end
end

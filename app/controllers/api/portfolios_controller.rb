class Api::PortfoliosController < ApplicationController
  load_and_authorize_resource
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
    elsif rmi_user_signed_in?
      asset_manager = AssetManager.find_by(email: portfolio_params[:email])
      if asset_manager.nil?
        puts 'asset manager nil'
        render_json_message(:forbidden, message: "Invalid Asset Manager Email")
        return
      else
        puts '1'
        portfolio = asset_manager.portfolios.new(portfolio_params.except(:email).merge(:id => asset_manager.id))
      end
    else
        puts '2'
      render_json_message(:forbidden, message: 'No asset manager or RMI admin is currently signed in')
    end
        puts '3'

    if portfolio.save
        render_json_message(:ok, message: 'New portfolio created', data: portfolio)
    else
        render_json_message(:forbidden, data: portfolio, errors: portfolio.errors.full_messages)
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
              :asset_manager,
              :buildings,
              :email
          )
  end
end

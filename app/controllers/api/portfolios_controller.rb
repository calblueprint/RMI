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
      portfolio = Portfolio.new(portfolio_params)
    else
      render_json_message(:forbidden, message: 'No asset manager or RMI admin is currently signed in')
    end
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

  def add_asset_manager
    portfolio = Portfolio.find(params[:id])
    asset_manager = AssetManager.where(email: params[:email]).first
    puts asset_manager
    if !asset_manager.nil?
      asset_manager.portfolio = portfolio
    else
      puts "creating new am"
      asset_manager = AssetManager.new(
        email: params[:email],
        first_name: params[:first_name],
        last_name: params[:last_name],
        phone: "0000000000", # use this filler by default, should be replaced during first login
        password: (0...15).map { (65 + rand(26)).chr }.join
        )
      puts params[:email]
      puts params[:first_name]
      puts params[:last_name]
      puts params[:phone]
      puts params[:password]
      asset_manager.portfolio = portfolio
    end
    if asset_manager.save
      puts "saved"
      AssetManagerMailer.new_user_delegated_email(asset_manager).deliver_now
      render_json_message(:ok, message: 'Asset manager added to portfolio', data: portfolio)
    else
      puts "fuck"
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
              :email,
              :first_name,
              :last_name
          )
  end
end

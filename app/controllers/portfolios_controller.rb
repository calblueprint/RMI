class PortfoliosController < ApplicationController
  def index
    @portfolios = Portfolio.all
    render json: @portfolios
  end

  def show
    @portfolio = Portfolio.find(params[:id])
    render json: @portfolio
  end

  def create
    @portfolio = Portfolio.new(portfolio_params)
    if @portfolio.save
      # Redirect to new portfolio
    end
  end

  def update
    @portfolio = Portfolio.find(params[:id])
    @portfolio.update(portfolio_params)
  end

  private
  def portfolio_params
    params.require(:portfolio).permit(:name, :asset_manager, :buildings)
  end
end

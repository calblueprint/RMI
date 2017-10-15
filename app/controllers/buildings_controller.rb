class BuildingsController < ApplicationController
  def create
    # should always create buildings with a portfolio
    @portfolio = Portfolio.find(params[:portfolio_id])
    @building = @portfolio.buildings.create(building_params)
  end

  def update
    # this is for when we set up the request to send a speific portfolio
    # @portfolio = Portfolio.find(params[:portfolio_id])
    # @building = @portfolio.buildings.find(params[:id])
    @building = Building.find(params[:id])
    @building.update(building_params)
  end

  def show
    # this is for when we set up the request to send a specific portfolio
    # @portfolio = Portfolio.find(params[:portfolio_id])
    # @building = @portfolio.buildings.find(params[:id])
    @building = Building.find(params[:id])
    render 'show'
  end

  def building_params
    params.require(:building).permit(:name, :contact_email, :portfolio_id)
  end
end

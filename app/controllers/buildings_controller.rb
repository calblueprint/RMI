class BuildingsController < ApplicationController
  def create
    @portfolio = Portfolio.find(params[:portfolio_id])
    @building = @portfolio.buildings.create(building_params)
  end

  def update
    @portfolio = Portfolio.find(params[:portfolio_id])
    @building = @portfolio.buildings.find(params[:id])
    @building.update(building_params)
  end

  def show
    @portfolio = Portfolio.find(params[:portfolio_id])
    @building = @portfolio.buildings.find(params[:id])
    render json: @building
  end

  def building_params
    params.require(:building).permit(:name, :contact_email, :activity)
  end
end

class Api::BuildingsController < ApplicationController
  def index
    buildings = Building.all
    render json: buildings
  end

  def create
    # should always create buildings with a portfolio
    portfolio = Portfolio.find(params[:portfolio_id])
    building = portfolio.buildings.create(building_params)

    if building.save
      render_json_message(:ok, data: building, message: "Building #{building.id} successfuly created and saved")
    else
      render_json_message(:forbidden, errors: building.errors.full_messages)
    end
  end

  def show
    building = Building.find(params[:id])
    render json: building
  end

  def update
    building = Building.find(params[:id])
    if building.update(building_params)
      render_json_message(:ok, data: building, message: "Building #{building.id} successfuly updated")
    else
      render_json_message(:forbidden, errors: building.errors.full_messages)
    end
  end

  private

  def building_params
    params.require(:building).permit(:name, :address, :city, :state, :zip, :portfolio_id)
  end
end

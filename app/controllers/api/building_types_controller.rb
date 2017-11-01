class Api::BuildingTypesController < ApplicationController
  def show
    building_type = BuildingType.find(params[:id])
    render json: building_type
  end
end

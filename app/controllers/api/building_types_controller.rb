class Api::BuildingTypesController < ApplicationController
  def show
    building_type = BuildingType.find(params[:id])
    render json: building_type
  end
  def create
    building_type = BuildingType.new(building_type_params)
    if building_type.save
      building_type = BuildingTypeSerializer.new(category)
      render_json_message(:ok, message: "New Building Type: #{building_type.id} created", data: new_building_type)
    else
      render_json_message(:forbidden, errors: building_type.errors.full_messages)
    end
  end
end

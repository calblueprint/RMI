class Api::BuildingTypesController < ApplicationController
  include ApplicationHelper

  def show
    building_type = BuildingType.find(params[:id])
    render json: building_type
  end
  
  def create
    building_type = BuildingType.new(building_type_params)
    if building_type.save
      new_building_type = BuildingTypeSerializer.new(building_type, scope: current_user.get_scope(current_user))
      render_json_message(:ok, message: "New Building Type: #{building_type.id} created", data: new_building_type)
    else
      render_json_message(:forbidden, errors: building_type.errors.full_messages)
    end
  end

  private

  def building_type_params
    params.require(:building_type)
      .permit(
        :name,
        :categories
      )
  end
end

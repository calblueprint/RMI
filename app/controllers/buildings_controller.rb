class BuildingsController < ApplicationController
  load_and_authorize_resource

  def show
    # this is for when we set up the request to send a specific portfolio
    # @portfolio = Portfolio.find(params[:portfolio_id])
    # @building = @portfolio.buildings.find(params[:id])
    @building = Building.find(params[:id])
    render 'show'
  end

  def create
    building = Building.new(building_params)
    if building.save
      if !building.building_type
        building.building_type = BuildingType.find(building_params[:building_type_id])
      end
      building.building_type_id = building_params[:building_type_id]
      new_building = BuildingSerializer.new(building, scope: current_user.get_scope)
      render_json_message(:ok, message: "New Building: #{building.id} created", data: new_building)
    else
      render_json_message(:forbidden, errors: building.errors.full_messages)
    end
  end

  private

  def building_params
    params.require(:building)
      .permit!
  end
end

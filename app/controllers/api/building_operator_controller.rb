class Api::BuildingOperatorController < ApplicationController
  def create
    building = Building.find(params[:building_id])
    building_operator = building.building_operator.create(building_operator_params)

    if building_operator.save
      put 'success'
    else
      put 'failed'
    end
  end

  private

  def building_operator_params
    params.require(:building_operator).permit(:email, :first_name, :last_name, :phone)
  end
end

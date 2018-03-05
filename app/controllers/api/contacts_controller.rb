class Api::ContactsController < ApplicationController

  skip_before_action :verify_authenticity_token
  # return a list of contacts in json available
  def index
    if !current_building_operator
      render :json => []
      return
    end

    contact_ids = Hash.new

    Delegation.where(source_id: current_building_operator.id).each do |delegation|
      result[delegation.building_operator_id] = 1
    end

    result = []

    contact_ids.each_key do |operator_id|
      operator = BuildingOperator.find(operator_id)
      result.push({
        email: operator.email, first_name: operator.first_name, last_name: operator.last_name
      })
    end

    render :json => result
  end
end

class Api::BuildingsController < ApplicationController
  load_and_authorize_resource
  def index
    buildings = Building.all
    render json: buildings
  end

  def create
    # should always create buildings with a portfolio
    portfolio = Portfolio.find(params[:portfolio_id])
    building = Building.new(building_params)
    if building.save
      portfolio.buildings.push(building)
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

  ##
  # Find the given building and create a new building_operator. Mark the given
  # question in the building as delegated, and return a new building instance.
  #
  def delegate_question
    building = Building.find(params[:id])
    building.answers.where(&:predelegated?).each do |answer|
      @building_operator = BuildingOperator.where(email: answer.text).first_or_create
      Answer.create!(building: building, question: answer.question, user: @building_operator, user_type: BuildingOperator)
      answer.set_status_delegated
    end
    @building_operator.buildings << building
  end

  def get_users_to_login_times
    building = Building.find(params[:id])
    building_operators = Set.new []
    building.delegations.where(status: 'active').each do |delegation|
      building_operators.add(delegation.building_operator)
    end
    users_to_login_times = {}
    building_operators.each do |building_operator|
      if building_operator.last_sign_in_at < Time.utc(2005) 
        users_to_login_times[building_operator.email] = nil;
      else 
        users_to_login_times[building_operator.email] = building_operator.last_sign_in_at
      end
    end
    render_json_message(:ok, data: users_to_login_times, message: "Got login time data")
  end

  private

  def building_params
    params.require(:building).permit(:name, :address, :city, :portfolio_id, :building_type_id)
  end

end

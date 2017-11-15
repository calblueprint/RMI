class BuildingsController < ApplicationController
  load_and_authorize_resource

  def show
    # this is for when we set up the request to send a specific portfolio
    # @portfolio = Portfolio.find(params[:portfolio_id])
    # @building = @portfolio.buildings.find(params[:id])
    @building = Building.find(params[:id])
    render 'show'
  end

  ##
  # Given a building, and an email, create a new building_operator
  # and mark the given question in the building as delegated, and return a new
  # building instance.
  #
  def delegate_question(building, email)
    building_operator = BuildingOperator.where(email: email).first_or_create
    building.answers.where{ |a| a.predelegated? }.each do |answer|
      answer = Answer.create!(building: building, question: answer.question, building_operator: building_operator)
    end
    building_operator.building = building
  end
end

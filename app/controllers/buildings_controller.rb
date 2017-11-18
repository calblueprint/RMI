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
    building.answers.where(&:predelegated?).each do |answer|
      building_operator = BuildingOperator.where(email: answer.text).first_or_create
      Answer.create!(building: building, question: answer.question, user: building_operator, user_type: BuildingOperator)
    end
    building_operator.buildings << building
  end
end

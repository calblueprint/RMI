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
  # Given a building and a set of questions, mark the given questions in the
  # building as delegated, and return a new building instance
  #
  def delegate(building, questions)
    questions.each do |question|
      answer = building.answers.select{ |a| a.question = question }

    end
  end

  ##
  # Given a building, questions, create a BuildingOperator and assign the
  # building + questions to the BuildingOperator. Return the BuildingOperator.
  #
  def assign(building, questions)

  end

end

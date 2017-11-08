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

  end

  ##
  # Given a building, questions, and a user, assign the building + questions to
  # the user.
  #
  def assign(building, questions, user)

  end

end

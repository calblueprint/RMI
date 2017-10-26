class BuildingOperatorsController < ApplicationController
  def show
    @building_operator = BuildingOperator.find(params[:id])
    if building_operator_signed_in? && current_building_operator.id == @rmi_user.id
      @answers = @building_operator.answers
      @question = {}
      for answer in @answers
        @question[answer.question.id] = answer.question
      end
    else
      @message = 'The RMI User is not currently logged in.'
    end
  end
end

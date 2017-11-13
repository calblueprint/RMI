class BuildingOperatorsController < ApplicationController
  def show
    @building_operator = BuildingOperator.find(params[:id])
    # if building_operator_signed_in? && current_building_operator.id == @building_operator.id
    #   @answers = @building_operator.answers
    #   @questions = []
    #   for answer in @answers
    #     @questions.push(answer.question)
    #   end
    # else
    #   @message = 'The RMI User is not currently logged in.'
    # end

    @state = {
        buildings: ActiveModel::Serializer::CollectionSerializer.new(
          @portfolio.buildings, each_serializer: BuildingSerializer),
        building_types: ActiveModel::Serializer::CollectionSerializer.new(
          BuildingType.all, each_serializer: BuildingTypeSerializer
        )
    }
  end
end

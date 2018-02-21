module ApplicationHelper
  # rubocop:disable AlignHash
  def asset_manager_initial_state
    portfolio = current_asset_manager.portfolio

    {
      buildings: ActiveModel::Serializer::CollectionSerializer.new(
        portfolio.buildings, each_serializer: BuildingSerializer,
        scope: {user_id: current_asset_manager.id,
                user_type: 'AssetManager'}
      ),
      questions: ActiveModel::Serializer::CollectionSerializer.new(
        current_asset_manager.questions, each_serializer: QuestionSerializer
      ),
      userType: 'AssetManager'
    }
  end

  def building_op_initial_state
    # Initial state here
    {
      buildings: ActiveModel::Serializer::CollectionSerializer.new(
       current_building_operator.buildings, each_serializer: BuildingSerializer,
       scope: {user_id: current_building_operator.id,
               user_type: 'BuildingOperator'}
      ),
      questions: ActiveModel::Serializer::CollectionSerializer.new(
        current_building_operator.questions, each_serializer: QuestionSerializer
      ),
      userType: 'BuildingOperator'
    }
  end

  def rmi_user_initial_state
    {
      portfolios: Portfolio.all,
      buildings: ActiveModel::Serializer::CollectionSerializer.new(
        Building.all, each_serializer: BuildingSerializer,
        scope: {user_id: current_rmi_user.id,
                user_type: 'RmiUser'}
      ),
      building_types: ActiveModel::Serializer::CollectionSerializer.new(
        BuildingType.all, each_serializer: BuildingTypeSerializer,
        scope: {user_id: current_rmi_user.id,
                user_type: 'RmiUser'}
      ),
      questions: ActiveModel::Serializer::CollectionSerializer.new(
        Question.all, each_serializer: QuestionSerializer
      ),
      userType: 'RMIUser'
    }
  end
  # rubocop:enable AlignHash
end

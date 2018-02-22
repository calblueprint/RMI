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
      userType: 'RMIUser'
    }
  end
  # rubocop:enable AlignHash
end

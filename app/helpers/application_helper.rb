module ApplicationHelper
  # rubocop:disable AlignHash
  def asset_manager_initial_state
    portfolio = current_asset_manager.portfolio

    {
      buildings: ActiveModel::Serializer::CollectionSerializer.new(
        portfolio.buildings, each_serializer: BuildingSerializer
      ),
      building_types: ActiveModel::Serializer::CollectionSerializer.new(
        current_asset_manager.building_types, each_serializer: BuildingTypeSerializer,
        scope: {user_id: current_asset_manager_id,
                user_type: 'AssetManager'}
      ),
      userType: 'AssetManager'
    }
  end

  def building_op_initial_state
    # Initial state here
    {
      buildings: ActiveModel::Serializer::CollectionSerializer.new(
       current_building_operator.buildings, each_serializer: BuildingSerializer
      ),
      building_types: ActiveModel::Serializer::CollectionSerializer.new(
       current_building_operator.building_types, each_serializer: BuildingTypeSerializer,
       scope: {user_id: current_building_operator_id,
               user_type: 'BuildingOperator'}
      ),
      userType: 'BuildingOperator'
    }
  end

  def rmi_user_initial_state
    portfolios = Portfolio.all
    {
      portfolios: portfolios,
      buildings: ActiveModel::Serializer::CollectionSerializer.new(
        (portfolios.map { |p| p.buildings }).flatten, each_serializer: BuildingSerializer
      ),
      building_types: ActiveModel::Serializer::CollectionSerializer.new(
        BuildingType.all, each_serializer: BuildingTypeSerializer,
        scope: {user_id: current_rmi_user_id,
                user_type: 'RmiUser'}
      ),
      userType: 'RMIUser'
    } 
  end
  # rubocop:enable AlignHash
end

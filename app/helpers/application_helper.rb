module ApplicationHelper
  def asset_manager_initial_state
    portfolio = current_asset_manager.portfolio

    {
      buildings: ActiveModel::Serializer::CollectionSerializer.new(
        portfolio.buildings, each_serializer: BuildingSerializer
      ),
      building_types: ActiveModel::Serializer::CollectionSerializer.new(
        BuildingType.all, each_serializer: BuildingTypeSerializer
      ),
      userType: 'AssetManager'
    }
  end

  def building_op_initial_state
    # Initial state here
  end

  def rmi_user_initial_state
    # Initial state here
  end
end
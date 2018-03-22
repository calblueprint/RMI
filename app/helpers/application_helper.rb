module ApplicationHelper
  # rubocop:disable AlignHash
  def asset_manager_initial_state
    portfolio = current_asset_manager.portfolio

    contact_ids = Hash.new

    Delegation.joins(answer: :building).where(buildings: { portfolio_id: portfolio.id} ).each do |delegation|
      contact_ids[delegation.building_operator_id] = 1
    end

    contacts = []

    BuildingOperator.where(id: contact_ids.keys).each do |operator|
      contacts.push({
        email: operator.email, first_name: operator.first_name, last_name: operator.last_name
      })
    end

    {
      user: current_asset_manager,
      buildings: ActiveModel::Serializer::CollectionSerializer.new(
          portfolio.buildings, each_serializer: BuildingSerializer,
          scope: {user_id: current_asset_manager.id,
                  user_type: 'AssetManager'}
      ),
      portfolios: portfolio,
      contacts: contacts,
      categories: current_asset_manager.categories,
      userType: current_asset_manager.class.name,
    }
  end

  def building_op_initial_state
    # Initial state here

    # Need to manually load contacts first
    contact_ids = Hash.new

    Delegation.where(source_id: current_building_operator.id).each do |delegation|
      contact_ids[delegation.building_operator_id] = 1
    end

    contacts = []

    BuildingOperator.where(id: contact_ids.keys).each do |operator|
      contacts.push({
        email: operator.email, first_name: operator.first_name, last_name: operator.last_name
      })
    end

    {
      user: current_building_operator,
      buildings: ActiveModel::Serializer::CollectionSerializer.new(
       current_building_operator.buildings, each_serializer: BuildingSerializer,
       scope: {user_id: current_building_operator.id,
               user_type: 'BuildingOperator'}
      ),
      userType: 'BuildingOperator',
      contacts: contacts,
      categories: current_building_operator.categories,
      userType: current_building_operator.class.name,
    }
  end

  def rmi_user_initial_state
    {
      user: current_rmi_user,
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

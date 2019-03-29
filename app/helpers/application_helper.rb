module ApplicationHelper
  # rubocop:disable AlignHash
  def asset_manager_initial_state
    portfolio = current_asset_manager.portfolio

    contact_ids = Hash.new

    Delegation.joins(answer: :building).where(buildings: { portfolio_id: portfolio.id} ).each do |delegation|
      contact_ids[delegation.building_operator_id] = 1
    end

    contacts = Set.new

    BuildingOperator.where(id: contact_ids.keys).each do |operator|
      contacts.add({
        email: operator.email, first_name: operator.first_name, last_name: operator.last_name
      })
    end

    {
      user: current_asset_manager,
      buildings: ActiveModel::Serializer::CollectionSerializer.new(
          portfolio.buildings, each_serializer: BuildingSerializer,
          scope: current_user.get_scope(current_user)
      ),
      portfolios: portfolio,
      contacts: contacts.to_a,
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

    contacts = Set.new

    BuildingOperator.where(id: contact_ids.keys).each do |operator|
      contacts.add({
        email: operator.email, first_name: operator.first_name, last_name: operator.last_name
      })
    end

    buildings =
      Building
        .includes(:answers, building_type: :questions)
        .where(id: current_building_operator.buildings.map { |b| b.id })

    {
      user: current_building_operator,
      buildings: ActiveModel::Serializer::CollectionSerializer.new(
       buildings, each_serializer: BuildingSerializer,
       scope: current_user.get_scope(current_user)
      ),
      userType: 'BuildingOperator',
      contacts: contacts,
      categories: ActiveModel::Serializer::CollectionSerializer.new(
        current_building_operator.categories, each_serializer: CategorySerializer
      ),
      userType: current_building_operator.class.name,
    }
  end

  def rmi_user_initial_state
    {
      user: current_rmi_user,
      portfolios: Portfolio.all,
      buildings: ActiveModel::Serializer::CollectionSerializer.new(
        Building.all, each_serializer: BuildingSerializer,
        scope: current_user.get_scope(current_user)
      ),
      building_types: ActiveModel::Serializer::CollectionSerializer.new(
        BuildingType.all, each_serializer: BuildingTypeSerializer,
        scope: current_user.get_scope(current_user)
      ),
      userType: 'RMIUser',
      categories: ActiveModel::Serializer::CollectionSerializer.new(
        Category.all, each_serializer: CategorySerializer
      )
    }
  end

  def current_user
    if current_rmi_user
      current_rmi_user
    elsif current_building_operator
      current_building_operator
    else
      current_asset_manager
    end
  end
  # rubocop:enable AlignHash
end

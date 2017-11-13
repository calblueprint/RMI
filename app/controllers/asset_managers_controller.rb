class AssetManagersController < ApplicationController
  # /asset_managers/:id
  def show
    @asset_manager = AssetManager.find(params[:id])
    load_initial_state

    # Attempt to redirect to the asset manager's portfolio page
    if asset_manager_signed_in? && current_asset_manager.id == @asset_manager.id
      if @asset_manager.portfolio
        redirect_to portfolio_path(@asset_manager.portfolio)
      else
        @message = 'This asset manager is logged in but does not have any portfolios yet.'
      end
    else
      @message = 'This asset manager is not currently logged in.'
    end
  end

  # /buildings/:bId
  def show_building
    @asset_manager = Building.find(params[:bId]).portfolio.asset_manager
    load_initial_state
    render 'show'
  end

  private

  def load_initial_state
    @portfolio = @asset_manager.portfolio
    @state = {
      buildings: ActiveModel::Serializer::CollectionSerializer.new(
        @portfolio.buildings, each_serializer: BuildingSerializer
      ),
      building_types: ActiveModel::Serializer::CollectionSerializer.new(
        BuildingType.all, each_serializer: BuildingTypeSerializer
      ),
      userType: 'AssetManager'
    }
  end
end

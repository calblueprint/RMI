class AssetManagersController < ApplicationController
  # /asset_managers/:id
  def show
    @asset_manager = AssetManager.find(params[:id])
    redirect_to "/portfolios/#{@asset_manager.portfolio.id}"
  end

  # /buildings/:bId
  def show_building
    @asset_manager = Building.find(params[:id]).portfolio.asset_manager
    load_initial_state
    render 'show'
  end

  # /portfolios/:pId
  def show_portfolio
    @asset_manager = Portfolio.find(params[:id]).asset_manager
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

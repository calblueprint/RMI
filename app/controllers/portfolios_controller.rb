class PortfoliosController < ApplicationController
  def index
    @portfolios = Portfolio.all
  end

  def show
    @portfolio = Portfolio.find(params[:id])
    @state = {
      buildings: ActiveModel::Serializer::CollectionSerializer.new(
        @portfolio.buildings, each_serializer: BuildingSerializer
      ),
      building_types: ActiveModel::Serializer::CollectionSerializer.new(
        BuildingType.all, each_serializer: BuildingTypeSerializer
      )
    }
  end
end

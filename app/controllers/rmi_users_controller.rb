class RmiUsersController < ApplicationController
  def show
    @rmi_user = RmiUser.find(params[:id])
    if rmi_user_signed_in? && current_rmi_user.id == @rmi_user.id
      @portfolios = Portfolio.all
    else
      @message = 'The RMI User is not currently logged in.'
    end
    @state = {
      portfolios: @portfolios,
      buildings: ActiveModel::Serializer::CollectionSerializer.new(
        @portfolios.map { |p| p.buildings }, each_serializer: BuildingSerializer
      ),
      building_types: ActiveModel::Serializer::CollectionSerializer.new(
        BuildingType.all, each_serializer: BuildingTypeSerializer
      )
    }
  end
end


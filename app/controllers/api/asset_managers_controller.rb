class Api::AssetManagersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    asset_managers = AssetManager.all
    render json: asset_managers
  end

  def show
    asset_manager = AssetManager.find(params[:id])
    render json: asset_manager
  end

  def create
    asset_manager = AssetManager.new(asset_manager_params)
    if asset_manager.save
      render_json_message(:ok, message: 'New asset manager created', data: asset_manager)
    else
      render_json_message(:forbidden, data: asset_manager, errors: asset_manager.errors.full_messages)
    end
  end

  def update
    asset_manager = AssetManager.find(params[:id])
    if asset_manager.update(asset_manager_params)
      render_json_message(:ok, message: 'Asset manager successfully updated', data: asset_manager)
    else
      render_json_message(:forbidden, data: asset_manager, errors: asset_manager.errors.full_messages)
    end
  end

  private
  def asset_manager_params
    params.require(:asset_manager)
        .permit(
          :first_name,
          :last_name,
          :email,
          :phone,
          :portfolios
        )
  end
end

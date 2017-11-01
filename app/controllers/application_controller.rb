class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  def render_json_message(status, options = {})
    render json: {
      data: options[:data],
      message: options[:message],
      to: options[:to],
      errors: options[:errors]
    }, status: status
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[first_name last_name phone])
  end

  def after_sign_in_path_for(resource)
    case
    when resource.is_a?(AssetManager)
      asset_manager_path(current_asset_manager)
    when resource.is_a?(RmiUser)
      rmi_user_path(current_rmi_user)
    when resource.is_a?(BuildingOperator)
      building_operator_path(current_building_operator)
    else
      super
    end
  end


end

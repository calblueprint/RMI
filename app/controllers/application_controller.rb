class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  include ApplicationHelper

  def show
    if asset_manager_signed_in?
      @state = asset_manager_initial_state
    elsif building_operator_signed_in?
      @state = building_op_initial_state
    elsif rmi_user_signed_in?
      @state = rmi_user_initial_state
    else
      # No current user; redirect to login page
      redirect_to '/'
    end
  end

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
      portfolio = current_asset_manager.portfolio
      "/portfolios/#{portfolio.id}"
    when resource.is_a?(RmiUser)
      "/portfolios"
    when resource.is_a?(BuildingOperator)
      "/buildings"
    else
      super
    end
  end

  def after_sign_out_path_for(resource)
    root_path
  end

  def current_ability
    if rmi_user_signed_in?
      @current_ability ||= AdminAbility.new(current_rmi_user) #this ability gets created on next task
    elsif asset_manager_signed_in?
      @current_ability ||= ManagerAbility.new(current_asset_manager) #this ability gets created on next task
    elsif building_operator_signed_in?
      @current_ability ||= Ability.new(current_building_operator)
    else
      raise CanCan::AccessDenied.new
    end
  end

  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      format.json { head :forbidden, content_type: 'text/html' }
      format.html { redirect_to main_app.root_url, notice: exception.message }
      format.js   { head :forbidden, content_type: 'text/html' }
    end
  end

end

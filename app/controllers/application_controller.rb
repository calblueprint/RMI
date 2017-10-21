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
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :phone])
  end
end

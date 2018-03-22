class Api::DropdownOptionsController < ApplicationController
  def create
    dropdown_option = DropdownOption.new(dropdown_options_params)
    if dropdown_option.save
      render_json_message(:ok, message: "New dropdown option: #{dropdown_option.id} created", data: dropdown_option)
    else
      render_json_message(:forbidden, errors: dropdown_option.errors.full_messages)
    end
  end

  def show
    dropdown_option = DropdownOption.find(params[:id])
    render json: dropdown_option
  end

  def update
    dropdown_option = DropdownOption.find(params[:id])
    if dropdown_option.update(dropdown_options_params)
      render_json_message(:ok, message: "Dropdown option #{dropdown_option.id} successfully updated", data: dropdown_option)
    else
      render_json_message(:forbidden, errors: dropdown_option.errors.full_messages)
    end
  end

  def destroy
    dropdown_option = DropdownOption.find(params[:id])
    dropdown_option.destroy
    if dropdown_option.destroyed?
      render_json_message(:ok, message: "Dropdown option #{dropdown_option.id} successfully destroyed")
    else
      render_json_message(:forbidden, errors: dropdown_option.errors.full_messages)
    end
  end

  private

  def dropdown_options_params
    params.require(:dropdown_option)
      .permit(
        :text,
        :question_id
      )
  end
end

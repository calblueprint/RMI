class Api::DelegationsController < ApplicationController
  load_and_authorize_resource

  def create
    delegation = Delegation.new(delegation_params)
    if delegation.save
      render_json_message(:ok, message: 'New delegation created', data: delegation)
    else
      render_json_message(:forbidden, data: delegation, errors: delegation.errors.full_messages)
    end
  end

  def update
    delegation = Delegation.find(params[:id])
    if delegation.update(delegation_params)
      render_json_message(:ok, message: 'Delegation successfully updated', data: delegation)
    else
      render_json_message(:forbidden, data: delegation, errors: delegation.errors.full_messages)
    end
  end

  # access to delegation is done from endpoints related to questions

  private

  def delegation_params
    params.require(:delegation)
    .permit(
      :building_operator_id,
      :answers_id,
      :status
    )
  end

end

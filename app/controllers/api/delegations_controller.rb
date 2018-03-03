class Api::DelegationsController < ApplicationController
  load_and_authorize_resource

  def create
    # either all delegations are created, or none
    Delegation.transaction do
      delegations_params.each do |delegation_params|
        Delegation.create!(delegation_params)
      end
      render_json_message(:ok, message: 'New delegations created')
    end
  rescue => e
    render_json_message(:forbidden, data: delegation, errors: e.message)
  end

  # access to delegation is done from endpoints related to questions

  private

  # only for batch creation case
  def delegations_params
    # delegations allow batch creation and therefore should be submitted as a list
    params.require(:delegation).map! do |delegation|
      delegation.permit(
        :building_operator_id,
        :answers_id,
        :status
      )
    end
  end

end

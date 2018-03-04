class Api::DelegationsController < ApplicationController
  load_and_authorize_resource

  # XXX: dependent questions are not automatically delegated, user should post
  # a batch that includes all dependent questions known
  def create
    # either all delegations are created, or none
    Delegation.transaction do
      # TODO: validate this user is currently the person delegated to
      # maybe easier to do in controller than cancancan?
      delegations_params.each do |delegation_params|
        Delegation.create!(delegation_params)

        # mark all other delegations on same answers_id delegated
        Delegation.where(
          answers_id: delegation_params[:answers_id], status: :active).each do |old_delegation|
            old_delegation.update(staus: :delegated)
        end
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

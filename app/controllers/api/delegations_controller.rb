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
        operator = BuildingOperator.find_by(email: delegation_params[:email])
        unless operator
          # if building operator doesn't exist, create it
          operator = BuildingOperator.create!(
            email: delegation_params[:email],
            first_name: delegation_params[:first_name],
            last_name: delegation_params[:last_name],
            phone: "0000000000" # use this filler by default, should be replaced during first login
          )
        end

        delegation_params[:building_operator_id] = operator.id

        if current_user.is_a?(BuildingOperator)
          delegation_params[:source_id] = current_user.id
        end

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
        :email,
        :first_name,
        :last_name,
        :answers_id,
        :status
      )
    end
  end

end

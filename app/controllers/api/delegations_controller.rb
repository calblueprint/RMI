class Api::DelegationsController < ApplicationController
  include ApplicationHelper
  # XXX: dependent questions are not automatically delegated, user should post
  # a batch that includes all dependent questions known
  def create
    # either all delegations are created, or none
    Delegation.transaction do
      # TODO: validate this user is currently the person delegated to
      # maybe easier to do in controller than cancancan?
      users_to_email = []
      delegations_params.each do |delegation_params|
        operator = BuildingOperator.find_by(email: delegation_params[:email])
        if !operator.nil?
          users_to_email.push(operator)
        else 
          # if building operator doesn't exist, create it
          operator = BuildingOperator.new(
            email: delegation_params[:email],
            first_name: delegation_params[:first_name],
            last_name: delegation_params[:last_name],
            phone: "0000000000", # use this filler by default, should be replaced during first login
            password: (0...15).map { (65 + rand(26)).chr }.join,
            last_sign_in_at: Time.utc(2000)
          )
          operator.save!
          BuildingOperatorMailer.new_user_delegated_email(operator, current_user).deliver_now
        end

        # mark all other delegations on same answer_id delegated
        Delegation.where(
          answer_id: delegation_params[:answer_id], status: :active).each do |old_delegation|
            old_delegation.update(status: :delegated)
        end

        answer = Answer.find(delegation_params[:answer_id]);
        unless answer.has_no_delegation
          answer.delegation_email = ""
          answer.delegation_first_name = ""
          answer.delegation_last_name = ""
          answer.save!
        end

        delegation = Delegation.new(
          answer: answer,
          source: current_building_operator,
          building_operator: operator,
          status: :active
        )

        authorize! :create, delegation

        delegation.save!
      end
      users_to_email.uniq.each do |u|
        if u.last_email_received < u.last_sign_in_at || Time.now.utc - 259200 >= u.last_email_received 
          BuildingOperatorMailer.existing_user_delegated_email(u, current_user).deliver_now
        end
      end
      render_json_message(:ok, message: 'New delegations created')
    end
  rescue => e
    render_json_message(:forbidden, errors: e.message)
  end

  # access to delegation is done from endpoints related to questions

  private

  # only for batch creation case
  def delegations_params
    # delegations allow batch creation and therefore should be submitted as a list
    params.require(:delegations).map! do |delegation|
      delegation.permit(
        :email,
        :first_name,
        :last_name,
        :answer_id,
      )
    end
  end

end

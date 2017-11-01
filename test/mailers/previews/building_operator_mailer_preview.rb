# Preview all emails at http://localhost:3000/rails/mailers/building_operator_mailer
class BuildingOperatorMailerPreview < ActionMailer::Preview
  def new_user_delegated_email
    BuildingOperatorMailer.new_user_delegated_email(BuildingOperator.first)
  end

  def existing_user_delegated_email
    BuildingOperatorMailer.existing_user_delegated_email(BuildingOperator.first)
  end
end

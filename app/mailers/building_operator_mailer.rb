class BuildingOperatorMailer < ApplicationMailer
  # Gets sent when a building operator is delegated questions but *hasn't been onboarded yet*
  def new_user_delegated_email(user, emailed_by)
    @user = user
    #emailed_by is user that sent the email to user
    @emailed_by = emailed_by
    # Manually generate a password reset link
    raw, encrypted = Devise.token_generator.generate(BuildingOperator, :reset_password_token)
    @user.reset_password_token = encrypted
    @user.reset_password_sent_at = Time.now.utc
    @user.last_email_received = Time.now.utc
    @user.save
    @url = edit_building_operator_password_url(@user, reset_password_token: raw)

    mail_to @user, subject: 'Welcome to RMI! You have new building tasks pending', @emailed_by
  end

  # Gets sent when an existing building operator is delegated more questions
  def existing_user_delegated_email(user)
    @user = user
    @user.last_email_received = Time.now.utc
    # @url = building_operator_path(@user)
    mail_to @user, subject: 'You have been assigned new building tasks'
  end

  private

  def mail_to(user, subject, emailed_by)
    email_with_name = %("#{user.first_name} #{user.last_name}" <#{user.email}>)
    mail(to: email_with_name, subject: subject[:subject])
  end
end

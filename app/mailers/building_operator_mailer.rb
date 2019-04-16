class BuildingOperatorMailer < ApplicationMailer
  include ApplicationHelper
  # Gets sent when a building operator is delegated questions but *hasn't been onboarded yet*
  def new_user_delegated_email(user, current_user)
    @user = user
    @current_user = current_user
    # Manually generate a password reset link
    raw, encrypted = Devise.token_generator.generate(BuildingOperator, :reset_password_token)
    @user.reset_password_token = encrypted
    @user.reset_password_sent_at = Time.now.utc
    @user.last_email_received = Time.now.utc
    @user.save
    @url = edit_building_operator_password_url(@user, reset_password_token: raw)

    mail_to @user, subject: 'Welcome to RMI! You have new building tasks pending'
  end

  # Gets sent when an existing building operator is delegated more questions
  def existing_user_delegated_email(user, current_user)
    @user = user
    @current_user = current_user
    @user.last_email_received = Time.now.utc
    @user.save
    # @url = building_operator_path(@user)
    mail_to @user, subject: 'You have been assigned new building tasks'
  end

  def existing_user_reminder_email(user)
    @user = user
    @user.last_email_received = Time.now.utc
    @user.save
    mail_to @user, subject: 'Reminder: Delegated Questions Pending!'
  end

  private

  def mail_to(user, subject)
    email_with_name = %("#{user.first_name} #{user.last_name}" <#{user.email}>)
    mail(to: email_with_name, subject: subject[:subject])
  end
end

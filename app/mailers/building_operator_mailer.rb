class BuildingOperatorMailer < ApplicationMailer
  # Gets sent when building operator is delegated questions but *hasn't been onboarded yet*
  def new_user_delegated_email(user)
    @user = user

    # Manually generate a password reset link
    raw, enc = Devise.token_generator.generate(BuildingOperator, :reset_password_token)
    user.reset_password_token = enc
    user.reset_password_sent_at = Time.now.utc
    user.save
    @url = edit_building_operator_password_url(@user, reset_password_token: raw)

    email_with_name = %("#{@user.first_name} #{@user.last_name}" <#{@user.email}>)
    mail(to: email_with_name, subject: 'Welcome to RMI! You have new building tasks pending')
  end
end

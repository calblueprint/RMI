class AssetManagerMailer < ApplicationMailer
	def new_user_delegated_email(user)
    @user = user
    # Manually generate a password reset link
    raw, encrypted = Devise.token_generator.generate(AssetManager, :reset_password_token)
    @user.reset_password_token = encrypted
    @user.reset_password_sent_at = Time.now.utc
    @user.save
    @url = edit_asset_manager_password_url(@user, reset_password_token: raw)

    mail_to @user, subject: 'Welcome to RMI! You have new building tasks pending'
  end

  private

  def mail_to(user, subject)
    email_with_name = %("#{user.first_name} #{user.last_name}" <#{user.email}>)
    mail(to: email_with_name, subject: subject[:subject])
  end

end

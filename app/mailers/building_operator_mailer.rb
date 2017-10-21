class BuildingOperatorMailer < ApplicationMailer
  # Gets sent to building operators when they are delegated questions but haven't been onboarded yet
  def new_user_delegated_email(user)
    @user = user
    email_with_name = %("#{@user.first_name} #{@user.last_name}" <#{@user.email}>)
    mail(to: email_with_name, subject: 'Welcome to RMI! You have new building tasks pending')
  end
end

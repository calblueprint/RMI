class AddDefaultSigninAtToRmiUsers < ActiveRecord::Migration[5.2]
  def change
  	change_column :rmi_users, :last_sign_in_at, :datetime, :default => Time.utc(2000)
  end
end

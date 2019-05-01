class AddDefaultSigninAtToAssetManagers < ActiveRecord::Migration[5.2]
  def change
  	change_column :asset_managers, :last_sign_in_at, :datetime, :default => Time.utc(2000)
  end
end

class RemoveContactEmailFromBuildings < ActiveRecord::Migration[5.1]
  def change
    remove_column :buildings, :contact_email, :string
  end
end

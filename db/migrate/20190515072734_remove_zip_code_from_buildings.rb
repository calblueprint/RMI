class RemoveZipCodeFromBuildings < ActiveRecord::Migration[5.2]
  def change
    remove_column :buildings, :zip, :integer
  end
end

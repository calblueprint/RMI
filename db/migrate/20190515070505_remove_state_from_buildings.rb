class RemoveStateFromBuildings < ActiveRecord::Migration[5.2]
  def change
    remove_column :buildings, :state, :integer
  end
end

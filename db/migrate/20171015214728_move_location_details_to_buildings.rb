class MoveLocationDetailsToBuildings < ActiveRecord::Migration[5.1]
  def change
    add_column :buildings, :address, :string
    add_column :buildings, :city, :string
    add_column :buildings, :state, :integer
    add_column :buildings, :zip, :integer

    drop_table :locations # goodnight
  end
end

class AddBuildingTypeRefToBuildings < ActiveRecord::Migration[5.1]
  def change
    add_reference :buildings, :building_type, foreign_key: true
  end
end

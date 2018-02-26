class AddBuildingTypeToCategory < ActiveRecord::Migration[5.1]
  def change
    add_reference :categories, :building_types, foreign_key: true
  end
end

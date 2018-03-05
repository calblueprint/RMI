class AddBuildingTypeToCategory < ActiveRecord::Migration[5.1]
  def change
    add_reference :categories, :building_type, foreign_key: true
  end
end

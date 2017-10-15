class CreateJoinTableBuildingBuildingOperator < ActiveRecord::Migration[5.1]
  def change
    create_join_table :buildings, :building_operators, { table_name: 'building_assignments' } do |t|
      # t.index [:building_id, :building_operator_id]
      # t.index [:building_operator_id, :building_id]
    end
  end
end

class CreateJoinTableBuildingBuildingOperator < ActiveRecord::Migration[5.1]
  def change
    create_join_table :buildings, :building_operators, { table_name: 'building_operator_assignments' } do |t|
      t.index [:building_id, :building_operator_id], name: 'by_op_on_building'
      t.index [:building_operator_id, :building_id], name: 'by_building_on_op'
    end
  end
end

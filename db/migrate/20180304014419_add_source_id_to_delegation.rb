class AddSourceIdToDelegation < ActiveRecord::Migration[5.1]
  def change
    remove_reference :delegations, :building_operator
    add_reference :delegations, :source
    add_reference :delegations, :building_operator
    add_foreign_key :delegations, :building_operators, primary_key: :id, column: :source_id
    add_foreign_key :delegations, :building_operators, primary_key: :id, column: :building_operator_id
  end
end

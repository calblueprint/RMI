class AddBuildingOperatorToAnswer < ActiveRecord::Migration[5.1]
  def change
    # establishing a new relationship between answers and building operators
    add_reference :answers, :building_operator, foreign_key: true
  end
end

class AddBuildingOperatorToAnswer < ActiveRecord::Migration[5.1]
  def change
    add_reference :answers, :building_operator, foreign_key: true
  end
end

class RemoveBuildingOperatorfromAnswers < ActiveRecord::Migration[5.1]
  def change
    remove_column :answers, :building_operator_id
  end
end

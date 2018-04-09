class RemoveUnitsFromRangeOptionsAndAddToQuestion < ActiveRecord::Migration[5.1]
  def change
    remove_column :range_options, :unit
    add_column :questions, :unit, :string
  end
end

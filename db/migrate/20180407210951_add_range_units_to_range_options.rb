class AddRangeUnitsToRangeOptions < ActiveRecord::Migration[5.1]
  def change
    add_column :range_options, :unit, :string
  end
end

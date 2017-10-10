class CreateRangeOptions < ActiveRecord::Migration[5.1]
  def change
    create_table :range_options do |t|
      t.integer :min
      t.integer :max
      t.references :question, foreign_key: true

      t.timestamps
    end
  end
end

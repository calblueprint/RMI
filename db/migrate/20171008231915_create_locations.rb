class CreateLocations < ActiveRecord::Migration[5.1]
  def change
    create_table :locations do |t|
      t.string :address
      t.integer :state
      t.integer :zip
      t.references :building, foreign_key: true

      t.timestamps
    end
  end
end

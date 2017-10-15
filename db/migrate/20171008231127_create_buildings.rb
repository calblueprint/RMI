class CreateBuildings < ActiveRecord::Migration[5.1]
  def change
    create_table :buildings do |t|
      t.string :name
      t.string :contact_email
      t.references :portfolio, foreign_key: true
      t.timestamps
    end
  end
end

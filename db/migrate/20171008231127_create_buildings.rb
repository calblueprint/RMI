class CreateBuildings < ActiveRecord::Migration[5.1]
  def change
    create_table :buildings do |t|
      t.string :name
      t.string :contact_email
      t.references :portfolios, foreign_key: true
      #t.references :BuildingType, foreign_key: true PULL THEN CREATE A MIGRATION WITH THIS REFERENCE

      t.timestamps
    end
  end
end

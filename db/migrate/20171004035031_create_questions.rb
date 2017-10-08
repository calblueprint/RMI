class CreateQuestions < ActiveRecord::Migration[5.1]
  def change
    create_table :questions do |t|
      t.integer :type
      t.references :building_type, foreign_key: true
      t.references :parent_option, polymorphic: true
      t.references :category, foreign_key: true
      t.string :text
      t.integer :status

      t.timestamps
    end
  end
end

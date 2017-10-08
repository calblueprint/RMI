class CreateDropdownOptions < ActiveRecord::Migration[5.1]
  def change
    create_table :dropdown_options do |t|
      t.string :text
      t.references :question, foreign_key: true

      t.timestamps
    end
  end
end

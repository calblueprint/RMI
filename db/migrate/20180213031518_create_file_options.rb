class CreateFileOptions < ActiveRecord::Migration[5.1]
  def change
    create_table :file_options do |t|
      t.references :question, foreign_key: true

      t.timestamps
    end
  end
end

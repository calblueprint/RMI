class CreateAnswers < ActiveRecord::Migration[5.1]
  def change
    create_table :answers do |t|
      t.text :text, default: nil
      t.references :building, foreign_key: true
      t.references :question, foreign_key: true

      t.timestamps
    end
  end
end

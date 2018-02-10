class CreateDelegation < ActiveRecord::Migration[5.1]
  def change
    create_table :delegation do |t|
      t.references :building_operator, foreign_key: true
      t.references :answers, foreign_key: true
      t.integer :status, default: 0, presence: true
      t.timestamps
    end
  end
end

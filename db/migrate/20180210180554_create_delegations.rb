class CreateDelegations < ActiveRecord::Migration[5.1]
  def change
    create_table :delegations do |t|
      t.references :building_operator, foreign_key: true, index: true
      t.references :answer, foreign_key: true, index: true
      t.integer :status, default: 0, presence: true
      t.timestamps
    end
  end
end

class CreateManagerAbilities < ActiveRecord::Migration[5.1]
  def change
    create_table :manager_abilities do |t|

      t.timestamps
    end
  end
end

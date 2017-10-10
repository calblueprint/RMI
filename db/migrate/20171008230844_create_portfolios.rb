class CreatePortfolios < ActiveRecord::Migration[5.1]
  def change
    create_table :portfolios do |t|
      t.string :name
      t.references :asset_manager, foreign_key: true

      t.timestamps
    end
  end
end

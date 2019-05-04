class AddPortfolioIdToAssetManager < ActiveRecord::Migration[5.2]
  def change
  	add_column :asset_managers, :portfolio_id, :integer
  end
end

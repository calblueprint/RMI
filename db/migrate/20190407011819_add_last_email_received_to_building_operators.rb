class AddLastEmailReceivedToBuildingOperators < ActiveRecord::Migration[5.2]
  def change
    add_column :building_operators, :last_email_received, :datetime
  end
end

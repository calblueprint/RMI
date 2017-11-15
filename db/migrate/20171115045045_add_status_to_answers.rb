class AddStatusToAnswers < ActiveRecord::Migration[5.1]
  def change
    add_column :answers, :status, :integer
  end
end

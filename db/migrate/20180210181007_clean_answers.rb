class CleanAnswers < ActiveRecord::Migration[5.1]
  def change
    remove_column :answers, :user_type
    remove_column :answers, :user_id
    remove_column :answers, :status
  end
end

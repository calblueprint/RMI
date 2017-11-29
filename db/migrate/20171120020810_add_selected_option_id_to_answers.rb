class AddSelectedOptionIdToAnswers < ActiveRecord::Migration[5.1]
  def change
    add_column :answers, :selected_option_id, :integer
  end
end

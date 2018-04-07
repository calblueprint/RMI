class AddHelperTextToQuestion < ActiveRecord::Migration[5.1]
  def change
    add_column :questions, :helper_text, :text
  end
end

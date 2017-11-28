class AddDefaultValueToAnswerText < ActiveRecord::Migration[5.1]
  def change
    change_column :answers, :text, :string, default: ''
  end
end

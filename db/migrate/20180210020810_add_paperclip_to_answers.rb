class AddPaperclipToAnswers < ActiveRecord::Migration[5.1]
  def change
    add_attachment :answers, :attachment
  end
end

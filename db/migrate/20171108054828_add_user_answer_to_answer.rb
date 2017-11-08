class AddUserAnswerToAnswer < ActiveRecord::Migration[5.1]
  def change
    add_reference :answers, :user_answer, polymorphic: true
  end
end

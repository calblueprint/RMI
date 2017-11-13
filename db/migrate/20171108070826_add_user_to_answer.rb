class AddUserToAnswer < ActiveRecord::Migration[5.1]
  def change
    add_reference :answers, :user, polymorphic: true
  end
end

class AddDelegationFieldsToAnswers < ActiveRecord::Migration[5.1]
  def change
    add_column :answers, :delegation_email, :string
    add_column :answers, :delegation_first_name, :string
    add_column :answers, :delegation_last_name, :string
  end
end

class AddParameterToQuestions < ActiveRecord::Migration[5.1]
  def change
    add_column :questions, :parameter, :string, { null: false }
  end
end

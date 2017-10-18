class DropdownOption < ApplicationRecord
  has_one :child_question, class_name: 'Question', as: :parent_option
  belongs_to :question
end

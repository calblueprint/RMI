class DropdownOption < ApplicationRecord
  has_one :question, as: :parent_option
  belongs_to :question
end

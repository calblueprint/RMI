# == Schema Information
#
# Table name: dropdown_options
#
#  id          :integer          not null, primary key
#  text        :string
#  question_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class DropdownOption < ApplicationRecord
  has_one :child_question, class_name: 'Question', as: :parent_option
  belongs_to :question
end

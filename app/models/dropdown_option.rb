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
  has_many :child_questions, as: :parent_option, :dependent => :destroy
  belongs_to :question
end

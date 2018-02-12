# == Schema Information
#
# Table name: answers
#
#  id                 :integer          not null, primary key
#  text               :string           default("")
#  building_id        :integer
#  question_id        :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  selected_option_id :integer
#

class Answer < ApplicationRecord
  belongs_to :building
  belongs_to :question

  validates :text, presence: true
end

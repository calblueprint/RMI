# == Schema Information
#
# Table name: answers
#
#  id                   :integer          not null, primary key
#  text                 :text
#  building_id          :integer
#  question_id          :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  building_operator_id :integer
#

class Answer < ApplicationRecord
  enum status: %i[unanswered answered predelegated delegated]

  belongs_to :building
  belongs_to :question
  belongs_to :building_operator

  validates :text, presence: true
end

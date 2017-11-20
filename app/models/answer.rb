# == Schema Information
#
# Table name: answers
#
#  id                 :integer          not null, primary key
#  text               :text
#  building_id        :integer
#  question_id        :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  status             :integer
#  user_type          :string
#  user_id            :integer
#  selected_option_id :integer
#

class Answer < ApplicationRecord
  enum status: %i[unanswered answered predelegated delegated]

  belongs_to :building
  belongs_to :question
  belongs_to :user, polymorphic: true

  validates :text, presence: true

  # set default status to unanswered
  after_initialize do
    self.status ||= :unanswered if new_record?
  end
end

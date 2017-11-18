# == Schema Information
#
# Table name: answers
#
#  id                   :integer          not null, primary key
#  text                 :text             default("")
#  building_id          :integer
#  question_id          :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  building_operator_id :integer
#  status               :integer
#

class Answer < ApplicationRecord
  enum status: %i[unanswered answered predelegated delegated]

  belongs_to :building
  belongs_to :question
  belongs_to :user, polymorphic: true

  validates :text, presence: true

  # Set default status to unanswered
  after_initialize do
    self.status ||= :unanswered if new_record?
  end

  ##
  # When a user is in delegation mode and hits a checkbox next to a question, a
  # request is sent to mark the question's answer as "predelegated", and the
  # email of the delegated user is stored in the answer's text
  #
  def set_status_predelegated(email)
    self.status = :predelegated
    self.text = email
  end

  ##
  # If a user is in delegation mode and unchecks a question, a request is sent
  # to mark the question's answer back to "unanswered"
  #
  def set_status_unanswered
    self.status = :unanswered
    self.text = ''
  end

  def set_status_answered
    self.status = :answered
  end

  def set_status_delegated
    self.status = :delegated
  end
end

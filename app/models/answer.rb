# == Schema Information
#
# Table name: answers
#
#  id                      :integer          not null, primary key
#  text                    :text             default("")
#  building_id             :integer
#  question_id             :integer
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  status                  :integer
#  user_type               :string
#  user_id                 :integer
#  attachment_file_name    :string
#  attachment_content_type :string
#  attachment_file_size    :integer
#  attachment_updated_at   :datetime
#

class Answer < ApplicationRecord
  enum status: %i[unanswered answered predelegated delegated]

  belongs_to :building
  belongs_to :question
  belongs_to :user, polymorphic: true

  has_attached_file :attachment

  validates :text, presence: true
  validates_with AttachmentSizeValidator, attributes: :attachment, less_than: 2.megabytes
  validate :valid_email, on: :update

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
    save! if self.valid?
  end

  ##
  # If a user is in delegation mode and unchecks a question, a request is sent
  # to mark the question's answer back to "unanswered"
  #
  def set_status_unanswered
    self.status = :unanswered
    self.text = ''
    save!
  end

  def set_status_answered
    self.status = :answered
    save!
  end

  def set_status_delegated
    self.status = :delegated
    save!
  end

  private

  ##
  # If the answer status is :predelegated, then check that the text contains a
  # valid email
  #
  def valid_email
    if self.predelegated? && self.text !~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
        errors.add(:text, 'invalid email')
    end
  end
end

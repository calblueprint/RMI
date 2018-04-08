# == Schema Information
#
# Table name: answers
#
#  id                       :integer          not null, primary key
#  text                     :string           default("")
#  building_id              :integer
#  question_id              :integer
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  selected_option_id       :integer
#  delegation_email         :string
#  delegation_first_name    :string
#  delegation_last_name     :string
#  attachment_file_name     :string
#  attachment_content_type  :string
#  attachment_file_size     :integer
#  attachment_updated_at    :datetime
#

class Answer < ApplicationRecord
  belongs_to :building
  belongs_to :question
  has_many :delegations, foreign_key: :answer_id, :dependent => :destroy
  has_many :building_operators, through: :delegations

  # attachment is used for FileOption
  # files on S3 should be private and accessed via expiring_url
  has_attached_file :attachment,
    :storage => :s3,
    :s3_permissions => :private

  validates_with AttachmentSizeValidator, attributes: :attachment, less_than: 2.megabytes
  do_not_validate_attachment_file_type :attachment

  def has_no_delegation
    delegation_email.blank? and delegation_first_name.blank? and delegation_last_name.blank?
  end

  def not_delegated
    delegations.length == 0
  end

  def delegated_to(user)
    result = false
    delegations.each do |delegation|
      if delegation.building_operator == user and delegation.status == "active"
        result = true
        break
      end
    end
    result
  end
end

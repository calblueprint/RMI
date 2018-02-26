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
  has_many :delegations, foreign_key: :answer_id
  has_many :building_operators, through: :delegations

  # attachment is used for FileOption
  # files on S3 should be private and accessed via expiring_url
  has_attached_file :attachment,
    :storage => :s3,
    :s3_permissions => :private

  validates :text, presence: true
  validates_with AttachmentSizeValidator, attributes: :attachment, less_than: 2.megabytes
  do_not_validate_attachment_file_type :attachment
end

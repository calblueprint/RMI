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

  has_attached_file :attachment

  validates :text, presence: true
  validates_with AttachmentSizeValidator, attributes: :attachment, less_than: 2.megabytes
end

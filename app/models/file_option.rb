# == Schema Information
#
# Table name: file_options
#
#  id          :integer          not null, primary key
#  question_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class FileOption < ApplicationRecord
  has_one :child_question, class_name: 'Question', as: :parent_option, :dependent => :destroy
  belongs_to :question
end

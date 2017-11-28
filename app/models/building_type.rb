# == Schema Information
#
# Table name: building_types
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class BuildingType < ApplicationRecord
  has_many :questions
  has_many :buildings

  def user_questions(user)
    questions = []
    self.questions.each do |question|
      if user.read_question(question)
        questions.push(question)
      end
    end
    questions
  end
end

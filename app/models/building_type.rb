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

  def questions
    questions = []
    if rmi_user_signed_in?
      # object.questions.each do |q|
      #   questions.push(q)
      # end
      questions = self.questions
    elsif asset_manager_signed_in?
      current_asset_manager.answer.each do |a|
        questions.push(a.question)
      end
    elsif building_operator_signed_in?
      current_building_operator.answer.each do |a|
        questions.push(a.question)
      end
    end
    questions
  end
end

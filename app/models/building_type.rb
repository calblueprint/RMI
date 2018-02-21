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

  def building_operator_questions(building_operator)
    # Input
    # building_operator: a BuildingOperator object
    #
    # Returns
    # an array of Question objects that this building operator has
    # read access to
    building_operator.questions
  end
end

# == Schema Information
#
# Table name: building_operator_assignments
#
#  building_id          :integer          not null
#  building_operator_id :integer          not null
#

class BuildingOperatorAssignment < ApplicationRecord
  belongs_to :building
  belongs_to :building_operator
end

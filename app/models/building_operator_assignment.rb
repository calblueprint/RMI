# == Schema Information
#
# Table name: building_operator_assignments
#
#  building_id          :integer          not null
#  building_operator_id :integer          not null
#

##
# A join table to allow Buildings to have_many BuildingOperators and
# BuildingOperators to have_many Buildings

class BuildingOperatorAssignment < ApplicationRecord
  belongs_to :building
  belongs_to :building_operator
end

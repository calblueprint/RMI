##
# A join table to allow Buildings to have_many BuildingOperators and
# BuildingOperators to have_many Buildings

class BuildingOperatorAssignment < ApplicationRecord
  belongs_to :building
  belongs_to :building_operator
end

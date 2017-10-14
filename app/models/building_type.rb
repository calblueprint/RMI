class BuildingType < ApplicationRecord
  has_many :questions
  has_many :buildings
end

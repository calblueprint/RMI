# == Schema Information
#
# Table name: portfolios
#
#  id               :integer          not null, primary key
#  name             :string
#  asset_manager_id :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Portfolio < ApplicationRecord
  has_many :asset_managers
  has_many :buildings

  validates :name, presence: true, uniqueness: true

  def building_types
    building_types = []
    buildings.each do |building|
      unless building_types.include?(building.building_type)
        building_types.push(building.building_type)
      end
    end
    building_types
  end
end

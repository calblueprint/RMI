# == Schema Information
#
# Table name: buildings
#
#  id               :integer          not null, primary key
#  name             :string
#  portfolio_id     :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  building_type_id :integer
#  address          :string
#  city             :string
#

class Building < ApplicationRecord
  belongs_to :portfolio
  belongs_to :building_type

  has_one :location

  has_many :answers
  has_many :delegations, through: :answers
  has_many :building_assignments, foreign_key: :building_id, class_name: "BuildingOperatorAssignment"
  has_many :building_operators, through: :building_assignments, source: :building_operator

  # state field was removed from buildings
  enum state: %i[
    Alabama
    Alaska
    Arizona
    Arkansas
    California
    Colorado
    Connecticut
    Delaware
    Florida
    Georgia
    Hawaii
    Idaho
    Illinois
    Indiana
    Iowa
    Kansas
    Kentucky
    Louisiana
    Maine
    Maryland
    Massachusetts
    Michigan
    Minnesota
    Mississippi
    Missouri
    Montana
    Nebraska
    Nevada
    New_Hampshire
    New_Jersey
    New_Mexico
    New_York
    North_Carolina
    North_Dakota
    Ohio
    Oklahoma
    Oregon
    Pennsylvania
    Rhode_Island
    South_Carolina
    South_Dakota
    Tennessee
    Texas
    Utah
    Vermont
    Virginia
    Washington
    West_Virginia
    Wisconsin
    Wyoming
    District_of_Columbia
    Puerto_Rico
    Guamto
    American_Samoa
    Virgin_Islands
    Northern_Mariana_Islands
  ]

  validates :name, :address, :city, presence: true

  def questions
    building_type.questions
  end



end

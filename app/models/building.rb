class Building < ApplicationRecord
  belongs_to :portfolio
  belongs_to :building_type
  has_one :location
  has_many :answers

  validates :name, :contact_email, presence: true



end

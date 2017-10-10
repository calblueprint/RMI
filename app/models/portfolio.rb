class Portfolio < ApplicationRecord
  belongs_to :asset_manager
  has_many :buildings

  validates :name, presence: true
end

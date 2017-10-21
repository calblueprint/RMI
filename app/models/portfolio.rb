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
  belongs_to :asset_manager
  has_many :buildings

  validates :name, presence: true
end

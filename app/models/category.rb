# == Schema Information
#
# Table name: categories
#
#  id               :integer          not null, primary key
#  name             :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  building_type_id :integer
#

class Category < ApplicationRecord
  has_many :questions, dependent: :destroy
  belongs_to :building_type

  validates :name, presence: true
end

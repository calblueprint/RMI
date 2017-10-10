class Category < ApplicationRecord
  has_many :questions

  validates :name, presence: true
end

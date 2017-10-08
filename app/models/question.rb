class Question < ApplicationRecord
  validates :text, presence: true

  enum type: [ :dropdown, :free, :range ]
  enum status: [ :draft, :published ]

  belongs_to :building_type
  belongs_to :parent_option, polymorphic: true
  belongs_to :category
  has_many :answers
  has_many :dropdown_options
  has_many :range_options
end

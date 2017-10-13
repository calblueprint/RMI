class Question < ApplicationRecord
  enum question_type: [ :dropdown, :free, :range ]
  enum status: [ :draft, :published ]

  belongs_to :building_type
  belongs_to :category
  belongs_to :parent_option, polymorphic: true, optional: true
  has_one :answers
  has_many :dropdown_options
  has_many :range_options

  validates :text, presence: true
end

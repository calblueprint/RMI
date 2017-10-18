class Question < ApplicationRecord
  enum question_type: [ :free, :dropdown, :range ]
  enum status: [ :draft, :published ]

  belongs_to :building_type
  belongs_to :category
  belongs_to :parent_option, polymorphic: true, optional: true
  has_many :answers
  has_many :dropdown_options
  has_many :range_options

  validates :text, presence: true
  validate :matches_parent_category


end

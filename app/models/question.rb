class Question < ApplicationRecord
  enum status: [ :draft, :published ]
  enum type: [ :dropdown, :free, :range ]
  belongs_to :building_type
  belongs_to :parent_option, polymorphic: true
  belongs_to :category
  has_many :answers
end

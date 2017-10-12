class Answer < ApplicationRecord
  belongs_to :building
  belongs_to :question
  belongs_to :building_operator

  validates :text, presence: true
end

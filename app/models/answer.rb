class Answer < ApplicationRecord
  belongs_to :building
  belongs_to :question

  validates :text, presence: true
end

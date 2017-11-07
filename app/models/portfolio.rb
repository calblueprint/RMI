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


  def read_answer(answer)
    contains = false
    buildings.each do |building|
      if building.answers.contains(answer)
        contains = true
        break
      end
    end
    contains
  end

  def read_question(question)
    contains = false
    buildings.each do |building|
      if building.read_question(question)
        contains = true
        break
      end
    end
    contains
  end
end

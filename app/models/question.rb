# == Schema Information
#
# Table name: questions
#
#  id                 :integer          not null, primary key
#  question_type      :integer
#  building_type_id   :integer
#  parent_option_type :string
#  parent_option_id   :integer
#  category_id        :integer
#  text               :string
#  status             :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  parameter          :string           not null
#

class Question < ApplicationRecord
  enum question_type: %i[free dropdown range]
  enum status: %i[draft published]

  belongs_to :building_type
  belongs_to :category
  belongs_to :parent_option, polymorphic: true, optional: true
  has_many :answers, :dependent => :destroy
  has_many :dropdown_options, :dependent => :destroy
  has_many :range_options, :dependent => :destroy


  validates :text, :question_type, :parameter, presence: true
  validate :matches_parent_category

  def matches_parent_category
    return if parent_option.nil?
    return if parent_option.question.category == category
    errors.add(:question, "category must match parent question's category")
  end

end

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
#

class Question < ApplicationRecord
  enum question_type: [ :free, :dropdown, :range ]
  enum status: [ :draft, :published ]

  belongs_to :building_type
  belongs_to :category
  belongs_to :parent_option, polymorphic: true, optional: true
  has_many :answers
  has_many :dropdown_options
  has_many :range_options

  validates :text, :question_type, presence: true
end

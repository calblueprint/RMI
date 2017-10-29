# == Schema Information
#
# Table name: buildings
#
#  id               :integer          not null, primary key
#  name             :string
#  portfolio_id     :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  building_type_id :integer
#  address          :string
#  city             :string
#  state            :integer
#  zip              :integer
#

class BuildingSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :portfolio_id,
             :building_type_id,
             :address,
             :city,
             :state,
             :zip

  has_many :questions
  has_many :answers

  # Questions are stored as a hash, where the key is the id and the value is the serialized question
  def questions
    questions = {}
    object.building_type.questions.each do |q|
      questions[q.id] = QuestionSerializer.new(q).as_json
    end
    questions
  end

  # Answers are stored as a hash, where the key is the id of the corresponding QUESTION
  def answers
    object.answers.index_by(&:question_id)
  end
end


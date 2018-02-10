# == Schema Information
#
# Table name: building_types
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class BuildingTypeSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :questions

  # Questions are stored as a hash, where the key is the id and the value is the serialized question
  def questions
    questions = {}
    if scope[:user_type] == 'BuildingOperator'
      building_operator = BuildingOperator.find(scope[:user_id])
      object.building_operator_questions(building_operator).each do |q|
        questions[q.id] = QuestionSerializer.new(q).as_json
      end
    else
      object.questions.each do |q|
        questions[q.id] = QuestionSerializer.new(q).as_json
      end
    end
    questions
  end
end

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
    # questions = {}
    # object.questions.each do |q|
    #   questions[q.id] = QuestionSerializer.new(q).as_json
    # end
    questions = {}
    object.questions.each do |q|
      questions[q.id] = QuestionSerializer.new(q).as_json
    end
  end

end

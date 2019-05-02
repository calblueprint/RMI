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
             :questions,
             :categories

  def id
    object.id.to_s
  end

  # Questions are stored as a hash, where the key is the id and the value is the serialized question
  def questions
    _questions =
      if scope[:user_type] == 'BuildingOperator'
        BuildingOperator.find(scope[:user_id]).questions_by_building_type(object.id)
      else
        object.questions
      end
    _questions.each_with_object({}) do |q, hsh|
      hsh[q.id] = QuestionSerializer.new(q).as_json
    end
  end

  def categories
    categories =
    if scope[:user_type] == 'RmiUser' or scope[:user_type] == 'AssetManager'
      object.categories.map { |cat| cat.id }
    else
      []
    end
    categories
  end
end

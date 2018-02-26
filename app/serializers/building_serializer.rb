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
             :zip,
             :answers,
             :questions

  # Answers are stored as a hash, where the key is the id of the corresponding QUESTION
  def answers
    object.answers.index_by(&:question_id)
  end

  def questions
    _questions =
      if scope[:user_type] == 'BuildingOperator'
        BuildingOperator.find(scope[:user_id]).questions_by_building(object.id)
      else
        object.questions
      end
    _questions.each_with_object({}) do |q, hsh|
      hsh[q.id] = QuestionSerializer.new(q).as_json
    end
  end
end

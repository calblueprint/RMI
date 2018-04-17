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
    questions = object.questions.ids
    _questions =
      if scope[:user_type] == 'BuildingOperator'
        delegations_for_building = scope[:delegations].select do |d|
          d.answer.building.id == object.id
        end
        ids_from_delegations = delegations_for_building.map { |d| d.answer.question.id }
        scope[:questions].select do |q|
          ids_from_delegations.include?(q.id)
        end
      else
        Building.includes(:building_type).find(object.id).questions
      end
    _questions.each_with_object({}) do |q, hsh|
      hsh[q.id] = QuestionSerializer.new(q).as_json
    end
  end
end

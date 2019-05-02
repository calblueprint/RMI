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

  def id
    object.id.to_s
  end

  # Answers are stored as a hash, where the key is the id of the corresponding QUESTION
  def answers
    object.answers.index_by(&:question_id)
  end

  def questions
    if scope[:user_type] == 'BuildingOperator'
      delegations_for_building = scope[:delegations].select do |d|
          d.answer.building.id == object.id
      end

      # Include delegated questions AND all of their parents
      _questions = []
      delegations_for_building.each do |d|
        _questions << d.answer.question
        _questions += Question.get_all_parents(d.answer.question)
      end

      # Return all relevant questions, but only allow editing on the ones
      # that are actively delegated to the current user
      ids_from_delegations = delegations_for_building.map { |d| d.answer.question.id }
      _questions.each_with_object({}) do |q, hsh|
        hsh[q.id] = QuestionSerializer.new(q).as_json
        hsh[q.id][:can_edit] = ids_from_delegations.include?(q.id)
      end
    else
      _questions = Building.includes(:building_type).find(object.id).questions
      _questions.each_with_object({}) do |q, hsh|
        hsh[q.id] = QuestionSerializer.new(q).as_json
        hsh[q.id][:can_edit] = true
      end
    end
  end
end

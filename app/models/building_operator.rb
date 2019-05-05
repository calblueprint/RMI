# == Schema Information
#
# Table name: building_operators
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  first_name             :string
#  last_name              :string
#  phone                  :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#

class BuildingOperator < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :building_assignments, foreign_key: :building_operator_id, class_name: "BuildingOperatorAssignment"
  has_many :buildings, through: :building_assignments, source: :building
  has_many :delegations, foreign_key: :building_operator_id
  has_many :answers, through: :delegations

  validates :first_name, :last_name, presence: true
  # email validation with regex
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :on => :create
  validates :phone, :presence => true, :numericality => true, :length => { :minimum => 10, :maximum => 15}
  validates_uniqueness_of :email

  def building_types
    building_types = Set.new []
    buildings.each do |building|
      building_types.add(building.building_type)
    end
    building_types.to_a
  end

  def buildings
    buildings = Set.new []
    d = delegations.where(status: 'active').includes(answer: :building).load.to_a
    d.each do |delegation|
      buildings << delegation.answer.building
    end
    buildings.to_a
  end

  def categories
    categories = Set.new []
    building_types.each do |building_type|
      categories.merge(building_type.categories)
    end
    categories.to_a
  end

  def questions_by_building_type(building_type_id)
    # Returns
    # questions: array of question objects that are accessible to read
    questions = []
    delegations.each do |delegation|
      if delegation.status == 'active' &&
        delegation.answer.building.building_type.id == building_type_id
        questions.push(delegation.answer.question)
      end
    end
    questions
  end

  def questions_by_building(building_id)
    # Returns
    # questions: array of question objects that are accessible to read
    questions = []
    d = delegations.where(status: 'active').includes(
      answer: [:building, question: [{ parent_option: :question }, :dropdown_options, :range_options ]]
    ).load.to_a
    d.each do |delegation|
      if delegation.answer.building.id == building_id
        question = delegation.answer.question
        questions << question
        questions = questions + Question.get_all_parents(question)
      end
    end
    questions
  end

  def questions_by_building_with_delegations(building_id, delegations)
    # Returns
    # questions: array of question objects that are accessible to read
    questions = []
    delegations.each do |delegation|
      if delegation.status == 'active' &&
        delegation.answer.building.id == building_id
        question = delegation.answer.question
        questions << question
        questions = questions + Question.get_all_parents(question)
      end
    end
    questions
  end

  def questions_by_buildings(building_ids)
    # Returns
    # questions: array of question objects that are accessible to read
    questions = Set.new
    d = delegations.where(status: 'active').includes(
      answer: [:building, question: [{ parent_option: :question }, :dropdown_options, :range_options ]]
    ).load.to_a
    d.each do |delegation|
      if building_ids.include?(delegation.answer.building.id)
        question = delegation.answer.question
        questions << question
        questions = questions + Question.get_all_parents(question)
      end
    end
    questions.to_a
  end

  def questions
    questions_by_buildings(buildings.map { |b| b.id })
  end

  def remind
    BuildingOperatorMailer.existing_user_reminder_email(self).deliver_now
  end

  def get_delegations
    Delegation.includes(answer: [:question, :building]).where(
      answer: Answer.where(building: buildings),
      building_operator: self,
      status: "active"
    )
      .load.to_a
  end

  # TODO 4/1: Do we want to use this scope instead when serializing buildings?
  # This limits the questions (supposedly) to only the ones that have been delegated to the current user
  def get_building_scope
    building_questions = {}
    buildings.each do |b|
      building_questions[b.id] = questions_by_buildings([b.id])
    end

    {
      user_id: id,
      user_type: 'BuildingOperator',
      delegations: get_delegations,
      questions: building_questions
    }
  end

  def get_scope(current_building_operator)
    {
      user_id: id,
      user_type: 'BuildingOperator',
      delegations: get_delegations,
      questions: Question
                   .where(id: self.questions.map { |q| q.id }).load.to_a,
    }
  end
end

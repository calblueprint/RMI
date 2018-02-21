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

  # after_create :send_onboarding_email

  has_many :building_assignments, foreign_key: :building_operator_id, class_name: "BuildingOperatorAssignment"
  has_many :buildings, through: :building_assignments, source: :building
  has_many :delegations, foreign_key: :building_operator_id
  has_many :answers, through: :delegations

  validates :first_name, :last_name, presence: true
  # email validation with regex
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :on => :create
  validates :phone, :presence => true, :numericality => true, :length => { :minimum => 10, :maximum => 15}
  validates_uniqueness_of :email

  # New building operator accounts are only created when an asset manager delegates a question to them,
  # so send an onboarding email telling them they have new questions.
  def send_onboarding_email
    BuildingOperatorMailer.new_user_delegated_email(self).deliver_now
  end

  def building_types
    building_types = Set.new []
    buildings.each do |building|
      building_types.add(building.building_type)
    end
    building_types.to_a
  end

  def buildings
    buildings = Set.new []
    delegations.each do |delegation|
      if delegation.status == 'active'
        buildings << delegation.answer.building
      end
    end
    buildings.to_a
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
    delegations.each do |delegation|
      if delegation.status == 'active' &&
        delegation.answer.building.id == building_id
        questions.push(delegation.answer.question)
      end
    end
    questions
  end

  def questions
    questions = Set.new
    delegations.each do |delegation|
      if delegation.status == 'active'
        questions << delegation.answer.question
      end
    end
    questions
  end
end

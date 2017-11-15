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

  after_create :send_onboarding_email

  has_many :answers

  has_many :building_assignments, foreign_key: :building_operator_id, class_name: "BuildingOperatorAssignment"
  has_many :buildings, through: :building_assignments, source: :building

  validates :first_name, :last_name, presence: true
  # email validation with regex
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :on => :create
  validates :phone, :presence => true, :numericality => true, :length => { :minimum => 10, :maximum => 15}

  # New building operator accounts are only created when an asset manager delegates a question to them,
  # so send an onboarding email telling them they have new questions.
  def send_onboarding_email
    BuildingOperatorMailer.new_user_delegated_email(self).deliver_now
  end

  def read_question(question)
    contains = false
    answers.each do |answer|
      if answer.question_id == question.id
        contains = true
        break
      end
    end
    contains
  end
end

# == Schema Information
#
# Table name: asset_managers
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

class AssetManager < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_one :portfolio

  after_create :send_onboarding_email

  validates :first_name, :last_name, presence: true
  # email validation with regex
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :on => :create
  validates :phone, :presence => true, :numericality => true, :length => { :minimum => 10, :maximum => 15}

  def read_question(question)
    contains = false
    building_types.each do |bt|
      if bt.questions.include?(question)
        contains = true
        break
      end
    end
    contains
  end

  def read_answer(answer)
    contains = false
    portfolio.buildings.each do |building|
      if building.answers.include?(answer)
        contains = true
        break
      end
    end
    contains
  end

  def create_answer(answer)
    portfolio.buildings.include?(answer.building)
  end

  def building_types
    portfolio.building_types
  end

  def categories
    categories = Set.new
    building_types.each do |building_type|
      categories.merge(building_type.categories)
    end
    categories
  end

  def questions
    questions = Set.new
    building_types.each do |bt|
      questions.merge(bt.questions)
    end
    questions
  end

  def send_onboarding_email
    AssetManagerMailer.new_user_delegated_email(self).deliver_now
  end

  def get_scope
    {user_id: id, user_type: 'AssetManager'}
  end
end

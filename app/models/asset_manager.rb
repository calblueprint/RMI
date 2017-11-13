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

  has_many :portfolios

  validates :first_name, :last_name, presence: true
  # email validation with regex
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :on => :create
  validates :phone, :presence => true, :numericality => true, :length => { :minimum => 10, :maximum => 15}

  def read_answer(answer)
    contains = false
    portfolios.each do |portfolio|
      if portfolio.read_answer(answer)
        contains = true
        break
      end
    end
    contains
  end

  def read_question(question)
    contains = false
    portfolios.each do |portfolio|
      if portfolio.read_question(question)
        contains = true
        break
      end
    end
    contains
  end

end

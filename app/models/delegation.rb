# == Schema Information
#
# Table name: delegations
#
#  id                   :integer          not null, primary key
#  source_id            :integer
#  building_operator_id :integer
#  answer_id            :integer
#  status               :integer          default("predelegated")
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#

class Delegation < ApplicationRecord

  # Element 0 of :status MUST BE :predelegated. In schema,
  # when delegation object is created, default value is the 0th
  # element of this enum, which should be :pre-delegated.
  belongs_to :building_operator
  belongs_to :source, :class_name => 'BuildingOperator', :foreign_key => 'source_id', optional: true
  belongs_to :answer

  enum status: %i[predelegated delegated active]

  validates :status, presence: true

  after_initialize do
    self.status ||= :predelegated if new_record?
  end

  def set_status_delegated
    # sets :status to delegated, which means that the associated
    # :building_operator has already delegated the associaetd
    # :answer and thus no longer has access to the :answer.
    self.status = :delegated
    save!
  end

  def set_status_active
    # sets :status to active, which means that the associated
    # :building_operator currently has read-write access to
    # the associated :answer
    self.status = :active
    save!
  end

  def set_status_predelegated
    # sets :status to predelegated, which is set by default.
    # This means the associated :answer is about to
    # be delegated by the active :building_operator to the
    # associated :building_operator
    self.status = :predelegated
    save!
  end
end

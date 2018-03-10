# == Schema Information
#
# Table name: delegations
#
#  id                   :integer          not null, primary key
#  building_operator_id :integer
#  answer_id            :integer
#  status               :integer          default("predelegated")
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#

require 'test_helper'

class DelegationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

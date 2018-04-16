# == Schema Information
#
# Table name: delegations
#
#  id                   :integer          not null, primary key
#  answer_id            :integer
#  status               :integer          default("predelegated")
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  source_id            :integer
#  building_operator_id :integer
#

require 'test_helper'

class DelegationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

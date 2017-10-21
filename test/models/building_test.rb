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

require 'test_helper'

class BuildingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

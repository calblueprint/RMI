# == Schema Information
#
# Table name: range_options
#
#  id          :integer          not null, primary key
#  min         :integer
#  max         :integer
#  question_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class RangeOptionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

# == Schema Information
#
# Table name: dropdown_options
#
#  id          :integer          not null, primary key
#  text        :string
#  question_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class DropdownOptionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

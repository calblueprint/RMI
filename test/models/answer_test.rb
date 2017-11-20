# == Schema Information
#
# Table name: answers
#
#  id                 :integer          not null, primary key
#  text               :text
#  building_id        :integer
#  question_id        :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  status             :integer
#  user_type          :string
#  user_id            :integer
#  selected_option_id :integer
#

require 'test_helper'

class AnswerTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

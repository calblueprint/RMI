# == Schema Information
#
# Table name: answers
#
#  id                      :integer          not null, primary key
#  text                    :string           default("")
#  building_id             :integer
#  question_id             :integer
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  selected_option_id      :integer
#  attachment_file_name    :string
#  attachment_content_type :string
#  attachment_file_size    :integer
#  attachment_updated_at   :datetime
#  delegation_email        :string
#  delegation_first_name   :string
#  delegation_last_name    :string
#

require 'test_helper'

class AnswerTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

require 'test_helper'

class Api::ContactsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get api_contacts_show_url
    assert_response :success
  end

end

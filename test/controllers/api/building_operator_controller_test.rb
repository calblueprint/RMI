require 'test_helper'

class Api::BuildingOperatorControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get api_building_operator_create_url
    assert_response :success
  end

end

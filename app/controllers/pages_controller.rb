# Static page controller
class PagesController < ApplicationController
  def home
  	@users = RmiUser.all
  end
end

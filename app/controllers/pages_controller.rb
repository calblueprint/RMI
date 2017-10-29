# Static page controller
class PagesController < ApplicationController
  def home
  	@state = Questions.all
  end
end

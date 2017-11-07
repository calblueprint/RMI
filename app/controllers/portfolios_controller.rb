class PortfoliosController < ApplicationController
  load_and_authorize_resource
  def index
    @portfolios = Portfolio.all
  end
  def show
    @portfolio = Portfolio.find(params[:id])
  end
end

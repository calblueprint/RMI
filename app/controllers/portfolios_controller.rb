class PortfoliosController < ApplicationController
  def index
    @portfolios = Portfolios.all
  end
  def show
    @portfolio = Portfolio.find(params[:id])
  end
end

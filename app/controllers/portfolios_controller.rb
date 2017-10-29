class PortfoliosController < ApplicationController
  def show
    @portfolio = Portfolio.find(params[:id])
    @state = 'cats'
  end
end

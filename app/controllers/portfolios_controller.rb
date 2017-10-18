class PortfoliosController < ApplicationController
  def show
    @portfolio = Portfolio.find(params[:id])
  end
end

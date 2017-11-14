class AssetManagersController < ApplicationController
  def show
    portfolio = AssetManager.find(params[:id]).portfolio
    redirect_to "/portfolios/#{portfolio.id}"
  end
end

class AssetManagersController < ApplicationController
  def show
    # If this asset manager is currently logged in and has existing portfolios,
    # redirect them to their most recent portfolio page.
    @asset_manager = AssetManager.find(params[:id])

    if asset_manager_signed_in? && current_asset_manager.id == @asset_manager.id
      last_portfolio = @asset_manager.portfolios.order('updated_at').last
      if last_portfolio
        redirect_to portfolio_path(last_portfolio)
      else
        @message = 'This asset manager is logged in but does not have any portfolios yet.'
      end
    else
      @message = 'This asset manager is not currently logged in.'
    end
  end
end

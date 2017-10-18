Rails.application.routes.draw do
  devise_for :building_operators
  devise_for :asset_managers
  devise_for :rmi_users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#home'
  resources :buildings, only: [:show]
  resources :portfolios, only: [:show]
  resources :asset_managers, only: [:show]

  namespace :api, defaults: { format: :json } do
    resources :portfolios, only: [:create, :update, :show, :index]
    resources :buildings, only: %i[index create update]
  end
end

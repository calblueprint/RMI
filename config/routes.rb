Rails.application.routes.draw do
  devise_for :building_operators
  devise_for :asset_managers
  devise_for :rmi_users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#home'
  resources :buildings, only: [:show]
  resources :portfolios, only: [:show]
  resources :asset_managers, only: [:show]
  resources :building_operators, only: [:show]

  namespace :api, defaults: { format: :json } do
    resources :portfolios, only: %i[create update show index]
    resources :building_types, only: %i[show]
    resources :buildings, only: %i[show index create update]
    resources :answers, only: %i[create update]
    resources :questions, only: %i[show create update destroy]
    # Can change route with:
    patch '/api/questions/publish', to: 'questions#publish'
  end
end

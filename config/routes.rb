Rails.application.routes.draw do
  devise_for :building_operators
  devise_for :asset_managers
  devise_for :rmi_users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#home'
  resources :buildings, only: %i[show]
  resources :portfolios, only: %i[show download]
  resources :asset_managers, only: %i[show]
  resources :building_operators, only: %i[show]

  namespace :api, defaults: { format: :json } do
    resources :portfolios, only: %i[index create update show] do
      collection do
        get :download
      end
    end
    resources :buildings, only: %i[index create update]
    resources :answers, only: %i[create update]
    resources :questions, only: %i[create update destroy]
    # Can change route with:
    patch '/api/questions/publish', to: 'questions#publish'
  end
end

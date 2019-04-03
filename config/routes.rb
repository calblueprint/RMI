Rails.application.routes.draw do
  namespace :api do
    get 'contacts/show'
  end

  devise_for :building_operators
  devise_for :asset_managers
  devise_for :rmi_users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#home'
  resources :portfolios, only: %i[download] do
    collection do
      get 'download/:id' => :download, as: 'download'
    end
  end

  
  namespace :api, defaults: { format: :json } do
    resources :building_types, only: %i[show create]
    resources :buildings, only: %i[show index create update]
    resources :answers, only: %i[show create]
    resources :questions, only: %i[show create update destroy]
    resources :portfolios, only: %i[index create update show]
    resources :delegations, only: %i[create]
    resources :dropdown_options, only: %i[create update destroy]
    resources :range_options, only: %i[create update destroy]
    resources :categories, only: %i[create update show destroy]
    # Can change route with:
    post 'answers/create_multiple', to: 'answers#create_multiple'
    patch 'answers/update', to: 'answers#update'
    patch 'answers/update_multiple', to: 'answers#update_multiple'
    patch 'questions/publish', to: 'questions#publish'
    delete 'answers/:id/attachment', to: 'answers#delete_file'
  end

  # Redirect everything else to the entry point for React;
  # React Router will then take care of what to display.
  # (This is a fallback and does not override any routes declared above!)
  get '/*other', to: 'application#show'
end

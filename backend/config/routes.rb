Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  post '/sign_up', to: 'authentications#sign_up'
  post '/sign_in', to: 'authentications#sign_in'
  put '/sign_out' => 'authentications#sign_out'
  put '/forget_password' => 'authentications#forget_password'

  resources :todos do
    post :create
    get :show
  end

  resources :categories

end

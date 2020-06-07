Rails.application.routes.draw do
  root to: 'home#index'

  namespace :api do 
    namespace :v1 do 
     resources :movies
     get :set1, to: 'data#set1'
    end 
  end 

  get '*page', to: 'home#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
end

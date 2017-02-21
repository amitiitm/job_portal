Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'login#access'
  resources :login do
    collection do
      post 'access'
    end
  end
end

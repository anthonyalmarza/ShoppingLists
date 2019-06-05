Rails.application.routes.draw do
  resources :lists do
    resources :items
  end
  resources :products, only: ['index']
end

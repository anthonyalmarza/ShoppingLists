class ProductsController < ApplicationController

  def index
    products = Product.text_search(params['q']).paginate(page: params['page'], per_page: 10)
    json_response(products)
  end
end

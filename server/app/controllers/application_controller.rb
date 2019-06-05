class ApplicationController < ActionController::API
  include Response
  include ExceptionHandler

  # called before every action on controllers
  before_action :authorize_request
  attr_reader :current_user_id

  private

  # Check for valid request token and return user
  def authorize_request
    @current_user_id = (AuthorizeApiRequest.new(request.headers).call)[:user_id]
  end
end

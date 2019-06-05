
module Response
  def json_response(object, status = :ok, **kwargs)
    render json: object, status: status, **kwargs
  end
end
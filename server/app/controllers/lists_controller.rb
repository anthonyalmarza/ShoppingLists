class ListsController < ApplicationController
  before_action :set_list, only: [:show, :update, :destroy]

  # GET /lists
  def index
    @lists = List.where(created_by: current_user_id).order(:created_at).paginate(page: params['page'], per_page: 10)
    json_response(
        @lists,
        adapter: :json,
        meta: {total: @lists.count}
    )
  end

  # POST /lists
  def create
    data = {:created_by => current_user_id}
    data.merge(list_params)
    @list = List.create!(
        name: list_params[:name],
        created_by: current_user_id,
        is_default: list_params.fetch(:is_default) { false }
    )
    json_response(@list, :created)
  end

  # GET /lists/:id
  def show
    json_response(@list)
  end

  # PUT /lists/:id
  def update
    @list.update(list_params)
    head :no_content
  end

  # DELETE /lists/:id
  def destroy
    @list.destroy
    head :no_content
  end

  private

  def list_params
    # whitelist params
    params.permit(:name, :is_default)
  end

  def set_list
    @list = List.find_by!(id: params[:id], created_by: current_user_id)
  end
end

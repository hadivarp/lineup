class TodosController < BaseController
  before_action :authenticate_user

  skip_before_action :verify_authenticity_token



  def create
    result = Todo.create(create_params)
    return render_blank_todo_title unless result

    if result.valid?
      head :no_content
    else
      render json: { errors: result.errors.full_messages }, status: :unprocessable_entity
    end
  end


  def update

  end


  def index

  end


  def show; end


  def delete

  end


  private

  def create_params
    params.permit(:title, :description, :deadtime).merge(user: current_user)
  end



  def render_blank_todo_title
    render json: { message: 'Something went wrong' }, status: :bad_request
  end


end

class TodosController < BaseController
  before_action :authenticate_user
  before_action :set_todo, only: [:update, :destroy]

  skip_before_action :verify_authenticity_token



  def create
    @todo = Todo.create(create_params)
    return render_blank_todo_title unless @todo

    if @todo.valid?
      category = Category.find(params[:category_id])
      CategoryTodo.create(category: category, todo: @todo)

      head :no_content
    else
      render json: { errors: @todo.errors.full_messages }, status: :unprocessable_entity
    end
  end



  def update
    render_blank_todo_title unless @todo.update(create_params)

    render json: { message: "Todo has successfully updated." }, status: 200

  end


  def index
    @todos = Todo.all
    render json: { todos: @todos.map { |todo| {id: todo.id, title: todo.title, description: todo.description, categories: todo.categories.map { |category| {  name: category.name } }
    }}  }

  end


  def show; end


  def destroy
    render_blank_todo_title unless @todo.destroy

    render json: { message: "Todo has successfully deleted." }, status: 200


  end


  private

  def create_params
    params.permit(:title, :description, :deadtime).merge(user: current_user)
  end


  def set_todo
    @todo = Todo.find_by_id params[:id]

    return render json: { errors: "Todo not found" },status: 404 if @todo.blank?
  end



  def render_blank_todo_title
    render json: { message: 'Something went wrong' }, status: :bad_request
  end


  def render_blank_or_invalid_category
    render json: { message: 'category id could not be blank or invalid' }, status: :bad_request
  end

end

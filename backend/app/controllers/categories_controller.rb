class CategoriesController < BaseController
  before_action :authenticate_user
  before_action :set_category, only: [:update, :destroy]

  skip_before_action :verify_authenticity_token

  def create
    @category = Category.new(category_params)

    if @category.save
      render_created_category
    else
      render_category_issues(:bad_request)
    end
  end


  def update
    render_category_issues(:bad_request) unless @category.update(category_params)

    render json: { message: "Category has successfully deleted." }, status: 200
  end

  def destroy
    render_category_issues(:bad_request) unless @category.destroy

    render json: { message: "Category has successfully updated." }, status: 200

  end

  def show; end

  def index
    @categories = Category.all
    render json: { categories: @categories.map { |category| { id: category.id, name: category.name } } }
  end


  private


  def category_params
    params.permit(:name)
  end

  def set_category
    @category = Category.find_by_id params[:id]

    return render json: { errors: "Category not found" },status: 404 if @category.blank?

  end

  def render_created_category
    render json: { meesage: 'Category created successfully' }, status: :ok

  end

  def render_category_issues(status)
    render json: { errors: @category.errors.full_messages }, status: status
  end
end

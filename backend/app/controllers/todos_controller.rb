class TodosController < BaseController
  skip_before_action :verify_authenticity_token

  before_action :authenticate_user



  def create
    result = Todo.create(create_params)

    if result.valid?
      head :no_content
    else
      render json: { errors: result.errors.full_messages }, status: :unprocessable_entity
    end
  end


  private

  def create_params
    params.permit(:title, :description, :deadtime).merge(user: current_user)
  end


  def current_user
    # Replace this with your logic to get the current user
    # For example, you might use a session, token, or other authentication mechanism.
    # This is just a placeholder; replace it with your actual logic.
    User.first
  end
end

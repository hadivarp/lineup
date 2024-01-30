class AuthenticationsController < BaseController
  before_action :authenticate_user, only: %i[sign_out forget_password]
  skip_before_action :verify_authenticity_token

  def sign_up
    user = User.find_by(email: user_params['email'])
    return render_existing_user_error if user

    user = User.new(user_params)
    if user.save
      render_created_user_success(user.token)
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def sign_in
    @user = User.find_by(email: user_params['email'])
    return render_unauthorized unless @user&.authenticate(user_params['password'])

    token = Auth.encode(user_id: @user.id)
    @user.update(token: token)
    render_login_success(token)
  end

  def sign_out
    return render_unauthorized unless @current_user.update(token: nil)

    render json: { message: 'User signed out successfully' }, status: :ok
  end

  def forget_password
    result = @current_user.update(password: user_params['password'])

    if result
      render json: { message: 'Password updated successfully' }, status: :ok
    else
      render json: { errors: @current_user.errors }, status: 400
    end
  end

  private

  def user_params
    params.require(:authentication).permit(:name, :email, :password)
  end

  def render_login_success(token)
    render json: { message: 'Login successful', user: { id: @user.id, email: @user.email, token: token } }, status: :accepted
  end

  def render_created_user_success(token)
    render json: { message: 'User created successfully', token: token }, status: :created
  end

  def render_existing_user_error
    render json: { message: 'User already exists' }, status: :unprocessable_entity
  end
end

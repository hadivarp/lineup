class BaseController < ApplicationController
  attr_reader :current_user

  def auth
    ::Auth.decode(token)
  end

  def token
    request.env['HTTP_AUTHORIZATION']&.split(' ')&.last
  end

  def authenticate_user
    authorization = auth
    return render_unauthorized unless authorization&.key?('user_id')

    @current_user ||= User.find_by(id: authorization['user_id'], token: token)
    return render_unauthorized unless @current_user
  end

  def error_renderer(msg, status)
    render json: Helpers::ErrorsHandler.view_parse(msg), status: status
  end

  private

  def render_unauthorized
    render json: { errors: [I18n.t('errors.authentication.unauthorized')] }, status: 401
  end
end

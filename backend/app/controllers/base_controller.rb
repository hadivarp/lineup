module Api
  module V1
    class BaseController < ApplicationController
      attr_reader :current_user

      def auth
        ::Auth.decode(token)
      rescue StandardError
        nil
      end

      def token
        request.env['HTTP_AUTHORIZATION']&.split(' ')&.flatten&.last
      end


      def authenticate_user
        authorization = auth
        return render json: { errors: [I18n.t('errors.authentication.invalid_credentials')] }, status: 401 unless authorization&.key?('user_id')

        @current_user ||= ::User.find_by(id: authorization['user_id'], token: token)
        return render json: { errors: [I18n.t('errors.authentication.unauthorized')] }, status: 401 unless @current_user

        render json: { errors: [I18n.t('errors.sign_in.not_verified')] }, status: 400 unless @current_user.verified?

      end
      

    end
  end
end



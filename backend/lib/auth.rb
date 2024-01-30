# frozen_string_literal: true

require 'jwt'

class Auth
  ALGORITHM = 'HS256'

  def self.encode(payload)
    JWT.encode(payload, auth_secret, ALGORITHM)
  end

  def self.decode(token)
    return {} if token.nil?
    secret = auth_secret
    begin
      JWT.decode(token, secret, true, algorithm: ALGORITHM).first
    rescue JWT::DecodeError => e
      Rails.logger.error("Error decoding token: #{e.message}")
      {}
    end
  end

  def self.auth_secret
    ENV['SECRET_KEY_BASE'] || 'secret_key'
  end
end

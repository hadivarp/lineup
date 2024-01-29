# frozen_string_literal: true

require 'jwt'

class Auth
  ALGORITHM = 'HS256'

  def self.encode(payload)
    JWT.encode(payload, auth_secret, ALGORITHM)
  end

  def self.decode(token)
    return {} if token.nil?

    JWT.decode(token, auth_secret, true, algorithm: ALGORITHM).first
  end

  def self.auth_secret
    ENV['SECRET_KEY_BASE']
  end
end

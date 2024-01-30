class User < ApplicationRecord
  has_secure_password

  has_many :todo



  before_create :generate_token


  private


  def generate_token
    self.token = Auth.encode(user_id: id)
  end


end

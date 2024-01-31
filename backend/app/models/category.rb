class Category < ApplicationRecord
  has_one :category_todo
  has_one :todo, through: :category_todo


  validates :name, presence: true
end

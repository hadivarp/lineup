class Todo < ApplicationRecord
  belongs_to :user
  has_many :category_todos
  has_many :categories, through: :category_todos
end
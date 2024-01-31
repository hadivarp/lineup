class Todo < ApplicationRecord
  belongs_to :user
  # has_one category_todo
  # has_one :category, through: :category_todo

end
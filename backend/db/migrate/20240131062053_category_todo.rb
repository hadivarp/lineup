class CategoryTodo < ActiveRecord::Migration[7.1]
  def change
    create_table :category_todos do |t|
      t.references :category, foreign_key: true
      t.references :todo, foreign_key: true

      t.timestamps
    end
  end
end

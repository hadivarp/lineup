class CreateTodos < ActiveRecord::Migration[7.1]
  def change
    create_table :todos do |t|
      t.string :title
      t.string :description
      t.datetime :deadtime
      t.references :user, foreign_key: true


      t.timestamps
    end
  end
end

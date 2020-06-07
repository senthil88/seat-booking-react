class CreateMovies < ActiveRecord::Migration[6.0]
  def change
    create_table :movies do |t|
      t.string :name
      t.text :summary
      t.string :year
      t.string :genre

      t.timestamps
    end
  end
end

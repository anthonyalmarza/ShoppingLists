class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :name

      t.timestamps
    end
    execute "create extension pg_trgm;"
    add_index :products, :name
  end
end

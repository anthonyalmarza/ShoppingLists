class CreateLists < ActiveRecord::Migration[5.2]
  def change
    create_table :lists do |t|
      t.string :name
      t.boolean :is_default, :null => false, :default => false
      t.string :created_by

      t.timestamps
    end
    add_index :lists, :created_by
  end
end

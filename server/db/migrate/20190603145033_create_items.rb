class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :name
      t.integer :quantity
      t.text :notes
      t.boolean :done, :null => false, :default => false
      t.references :list, foreign_key: true

      t.timestamps
    end
  end
end

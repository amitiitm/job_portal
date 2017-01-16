class CreateProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      t.integer :number
      t.string :description
      t.string :status
      t.string :category
      t.string :sales_type
    end
  end
end

class CreateProjects < ActiveRecord::Migration[5.0]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :email
      t.integer :mobile
      t.integer :project_type
    end
  end
end

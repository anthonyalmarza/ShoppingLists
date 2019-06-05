class Product < ApplicationRecord

  validates_presence_of :name
  validates_uniqueness_of :name
  validates_length_of :name, minimum: 3, maximum: 64

  def self.text_search(query)
    self.where(
        "similarity(title, ?) > 0.3",
        query
    ).order("similarity(title, #{ActiveRecord::Base.connection.quote(query)}) DESC")
  end

end

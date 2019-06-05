class Item < ApplicationRecord
  belongs_to :list

  validates :name, length: { minimum: 2, maximum: 64 }, presence: true
  validates :quantity, numericality: { greater_than_or_equal_to: 0 }, presence: true
end

class List < ApplicationRecord

  has_many :items, dependent: :destroy

  validates_presence_of :name
  validates_presence_of :created_by
end

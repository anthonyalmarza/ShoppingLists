class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :quantity, :notes, :created_at
end

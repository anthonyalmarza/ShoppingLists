class ListSerializer < ActiveModel::Serializer
  attributes :id, :name, :is_default, :created_at
end

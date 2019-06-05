FactoryBot.define do
  factory :item do
    name { Faker::Food.ingredient }
    quantity { Faker::Number.number(1) }
  end
end
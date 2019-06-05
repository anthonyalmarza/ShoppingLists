FactoryBot.define do
  factory :list do
    name { Faker::Lorem.word }
    created_by { Faker::Number.number(14) }
  end
end
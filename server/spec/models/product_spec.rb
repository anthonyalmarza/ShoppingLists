require 'rails_helper'

RSpec.describe Product, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_length_of(:name) }
  it { should validate_uniqueness_of(:name) }
end
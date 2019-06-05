require 'rails_helper'

RSpec.describe Item, type: :model do
  # Association test
  # ensure an item record belongs to a single list record
  it { should belong_to(:list) }
  # Validation test
  # ensure column name is present before saving
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:quantity) }
end

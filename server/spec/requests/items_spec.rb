require 'rails_helper'

RSpec.describe 'Items API' do
  # Initialize the test data
  let!(:user_id) { Faker::Number.number(5) }
  let!(:list) { create(:list, created_by: user_id) }
  let!(:items) { create_list(:item, 20, list_id: list.id) }
  let(:list_id) { list.id }
  let(:id) { items.first.id }
  let(:headers) { valid_headers }

  # Test suite for GET /lists/:list_id/items
  describe 'GET /lists/:list_id/items' do
    before { get "/lists/#{list_id}/items", params: {}, headers: headers }

    context 'when list exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns a page of items' do
        expect(json['items'].size).to eq(10)
        expect(json['meta']['total']).to eq(20)
      end
    end

    context 'when list does not exist' do
      let(:list_id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find List/)
      end
    end
  end

  # Test suite for GET /lists/:list_id/items/:id
  describe 'GET /lists/:list_id/items/:id' do
    before { get "/lists/#{list_id}/items/#{id}", params: {}, headers: headers }

    context 'when list item exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns the item' do
        expect(json['id']).to eq(id)
      end
    end

    context 'when list item does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Item/)
      end
    end
  end

  # Test suite for PUT /lists/:list_id/items
  describe 'POST /lists/:list_id/items' do
    let(:valid_attributes) { { name: 'Visit Narnia', quantity: 2}.to_json }

    context 'when request attributes are valid' do
      before { post "/lists/#{list_id}/items", params: valid_attributes, headers: headers }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when an invalid request' do
      before { post "/lists/#{list_id}/items", params: {}, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expect(response.body).to match(/Validation failed: Name is too short/)
      end
    end
  end

  # Test suite for PUT /lists/:list_id/items/:id
  describe 'PUT /lists/:list_id/items/:id' do
    let(:valid_attributes) { { name: 'Mozart' }.to_json }

    before { put "/lists/#{list_id}/items/#{id}", params: valid_attributes, headers: headers }

    context 'when item exists' do
      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end

      it 'updates the item' do
        updated_item = Item.find(id)
        expect(updated_item.name).to match(/Mozart/)
      end
    end

    context 'when the item does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Item/)
      end
    end
  end

  # Test suite for DELETE /lists/:id
  describe 'DELETE /lists/:id' do
    before { delete "/lists/#{list_id}/items/#{id}", params: {}, headers: headers }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
require 'rails_helper'

RSpec.describe 'Lists API', type: :request do
  # initialize test data
  let!(:user_id) { Faker::Number.number(5) }
  let!(:lists) { create_list(:list, 10, created_by: user_id) }
  let(:list_id) { lists.first.id }
  let(:headers) { valid_headers }

  # Test suite for GET /lists
  describe 'GET /lists' do
    # make HTTP get request before each example
    before { get '/lists', params: {}, headers: headers }

    it 'returns lists' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json['lists'].size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /lists/:id
  describe 'GET /lists/:id' do
    before { get "/lists/#{list_id}", params: {}, headers: headers }

    context 'when the record exists' do
      it 'returns the list' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(list_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:list_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find List/)
      end
    end
  end

  # Test suite for POST /lists
  describe 'POST /lists' do
    # valid payload
    let(:valid_attributes) { { name: 'Learn Elm' }.to_json }

    context 'when the request is valid' do
      before { post '/lists', params: valid_attributes, headers: headers }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
      it 'creates a list' do
        expect(json['name']).to eq('Learn Elm')
      end

    end

    context 'when the request is invalid' do
      before { post '/lists', params: { name: nil }.to_json, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
            .to match(/Validation failed: Name can't be blank/)
      end
    end
  end

  # Test suite for PUT /lists/:id
  describe 'PUT /lists/:id' do
    let(:valid_attributes) { { name: 'Shopping' }.to_json }

    context 'when the record exists' do
      before { put "/lists/#{list_id}", params: valid_attributes, headers: headers }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE /lists/:id
  describe 'DELETE /lists/:id' do
    before { delete "/lists/#{list_id}", params: {}, headers: headers }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
import {
    GET_SHOPPING_LISTS,
    GET_SHOPPING_LIST,
    REQUEST_SHOPPING_LIST,
    DELETE_SHOPPING_LIST,
    CREATE_SHOPPING_LIST
} from "state/action_types";
import { batch } from 'react-redux';
import faker from 'faker';


const getShoppingLists = (authToken) => dispatch => {
    fetch('http://localhost:3000/lists/', {
        headers: {
            'Authorization': `JWT ${authToken}`,
            'content-type': 'application/json'
        }
    })
        .then(res => res.json(), reason => console.log(reason))
        // .then(data => console.log(data))
        .then(data => dispatch({
            type: GET_SHOPPING_LISTS,
            payload: data.lists
        }))
};

const switchShoppingList = (listId, authToken) => dispatch => {
    batch(() => {
        dispatch({
            type: REQUEST_SHOPPING_LIST,
            payload: listId,
        });
        fetch(`http://localhost:3000/lists/${listId}/`, {
            headers: {
                'Authorization': `JWT ${authToken}`,
                'content-type': 'application/json'
            }
        })
            .then(res => res.json(), reason => console.log(reason))
            // .then(data => console.log(data))
            .then(data => dispatch({
                type: GET_SHOPPING_LIST,
                payload: data
            }))
    })
};

const deleteShoppingList = (listId, authToken) => dispatch => {
  fetch(`http://localhost:3000/lists/${listId}`, {
      method: 'DELETE',
      headers: {
          'Authorization': `JWT ${authToken}`,
          'content-type': 'application/json'
      }
  })
      .then(res => {
          if (res.status === 204) {
              dispatch({
                  type: DELETE_SHOPPING_LIST,
                  payload: true,
                  listId: listId
              })
          }
      })
};


const addShoppingList = (authToken) => dispatch => {
    fetch(`http://localhost:3000/lists/`, {
        method: 'POST',
        body: JSON.stringify({name: faker.fake('{{lorem.word}}')}),
        headers: {
            'Authorization': `JWT ${authToken}`,
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status === 201) {
                dispatch({
                    type: CREATE_SHOPPING_LIST,
                    payload: true
                })
            }
        })
};

export default {
    getShoppingLists,
    switchShoppingList,
    deleteShoppingList,
    addShoppingList,
};
import {
    GET_SHOPPING_LIST_ITEMS,
    DELETE_SHOPPING_LIST_ITEM,
    CREATE_SHOPPING_LIST_ITEM
} from "state/action_types";
import faker from "faker";


const getShoppingListItems = (listId, authToken) => dispatch => {
    fetch(`http://localhost:3000/lists/${listId}/items/`, {
        headers: {
            'Authorization': `JWT ${authToken}`,
            'content-type': 'application/json'
        }
    })
        .then(res => res.json(), reason => console.log(reason))
        .then(data => dispatch({
            type: GET_SHOPPING_LIST_ITEMS,
            payload: data['items']
        }))
};


const deleteShoppingListItem = (listId, itemId, authToken) => dispatch => {
    fetch(`http://localhost:3000/lists/${listId}/items/${itemId}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `JWT ${authToken}`,
            'content-type': 'application/json'
        }
    })
        .then(res => {
            if (res.status === 204) {
                dispatch({
                    type: DELETE_SHOPPING_LIST_ITEM,
                    payload: true,
                    listId: listId
                })
            }
        })
};


const addShoppingListItem = (listId, authToken) => dispatch => {
    fetch(`http://localhost:3000/lists/${listId}/items/`, {
        method: 'POST',
        body: JSON.stringify({name: faker.fake('{{company.companyName}}'), quantity: faker.random.number()}),
        headers: {
            'Authorization': `JWT ${authToken}`,
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status === 201) {
                dispatch({
                    type: CREATE_SHOPPING_LIST_ITEM,
                    payload: true
                })
            }
        })
};


export default {
    getShoppingListItems,
    deleteShoppingListItem,
    addShoppingListItem,
};

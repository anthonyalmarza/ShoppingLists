import {
    GET_SHOPPING_LIST_ITEMS,
    REQUEST_SHOPPING_LIST,
    GET_SHOPPING_LIST,
    DELETE_SHOPPING_LIST_ITEM,
    CREATE_SHOPPING_LIST_ITEM,
} from "state/action_types";

const initialState = {
    shoppingListItems: [],
    shoppingListItem: {},
    itemsStale: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_SHOPPING_LIST_ITEMS:
            return {
                ...state,
                shoppingListItems: action.payload,
                itemsStale: false
            };
        case REQUEST_SHOPPING_LIST:
            return {
                ...state,
                shoppingListItems: [],
                itemsStale: false
            };
        case GET_SHOPPING_LIST:
            return {
                ...state,
                itemsStale: true
            };
        case DELETE_SHOPPING_LIST_ITEM:
            return {
                ...state,
                itemsStale: true
            };
        case CREATE_SHOPPING_LIST_ITEM:
            return {
                ...state,
                itemsStale: true
            };
        default:
            return state;
    }
};


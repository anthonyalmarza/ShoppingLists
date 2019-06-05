import {
    GET_SHOPPING_LISTS,
    GET_SHOPPING_LIST,
    DELETE_SHOPPING_LIST,
    CREATE_SHOPPING_LIST,
} from "state/action_types";
import _ from 'lodash';

const initialState = {
    shoppingLists: [],
    shoppingList: {},
    itemsStale: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_SHOPPING_LISTS:
            // NOTE: this should probably be a selector in selectors.js
            let shoppingList = {};
            if (_.isEmpty(state.shoppingList)) {
                let idx = _.findIndex(action.payload, ['is_default', true]);
                if ( idx === -1 ) {
                    idx = 0;
                }
                shoppingList = action.payload[idx];
            }
            return {
                ...state,
                shoppingList,
                shoppingLists: action.payload,
                itemsStale: false
            };
        case GET_SHOPPING_LIST:
            return {
                ...state,
                shoppingList: action.payload,
            };
        case DELETE_SHOPPING_LIST:
            return {
                ...state,
                itemsStale: action.payload
            };
        case CREATE_SHOPPING_LIST:
            return {
                ...state,
                itemsStale: action.payload
            };
        default:
            return state;
    }
};


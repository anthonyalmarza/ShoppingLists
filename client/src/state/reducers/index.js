import {combineReducers} from "redux";
import shoppingListReducer from 'state/reducers/shoppingListReducer';
import shoppingListItemReducer from 'state/reducers/shoppingListItemReducer';

const initialState = {
    authToken: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidmVyeWZha2VpZCIsImV4cCI6NDcxNTM3Mzk5Mn0.ErpZ6bvkBjk67i6dyDlZ6n8pINgzzVQNELryeeW6gJU'
};

export default combineReducers({
    shoppingListReducer,
    shoppingListItemReducer,
    userReducer: (state = initialState, action) => {
        switch (action.type) {
            default:
                return state
        }
    }
});
import React from 'react';
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { connect } from 'react-redux';
import shoppingListItemActions from 'state/actions/shoppingListItemActions';

const AddShoppingListItemButton = (props) => {

    const style = {
        margin: 0,
        right: 20,
        left: 'auto',
        position: 'fixed',
    };

    return (
        <Fab
            color="secondary"
            style={style}
            onClick={() => props.addShoppingListItem(props.shoppingList.id, props.authToken)}
        >
            <AddIcon/>
        </Fab>
    );
};

const mapStateToProps = state => ({
    authToken: state.userReducer.authToken,
    shoppingList: state.shoppingListReducer.shoppingList
});

export default connect(mapStateToProps, shoppingListItemActions)(AddShoppingListItemButton);
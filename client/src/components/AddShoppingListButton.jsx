import React from 'react';
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { connect } from 'react-redux';
import shoppingListActions from 'state/actions/shoppingListActions';


const AddShoppingListButton = (props) => {
    const style = {
        margin: 0,
        left: 20,
        right: 'auto',
        position: 'fixed',
    };
    const handleClick = (event) => {
        props.addShoppingList(props.authToken)
    };
    return (
        <IconButton color="primary" style={style} onClick={handleClick}><AddIcon /></IconButton>
    );
};

const mapStateToProps = state => ({
  authToken: state.userReducer.authToken
});

export default connect(mapStateToProps, shoppingListActions)(AddShoppingListButton);
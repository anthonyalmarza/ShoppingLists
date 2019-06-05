import React, { useState, useEffect } from 'react';
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {ListItemSecondaryAction} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import { connect } from 'react-redux';
import shoppingListItemActions from 'state/actions/shoppingListItemActions';
import _ from 'lodash';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";


const ShoppingListItem = (props) => {
    const [ initialized, setInitialized ] = useState(false);
    const [ anchorEl, setAnchorEl ] = useState(null);

    useEffect(() => {
        if (!initialized && !_.isEmpty(props.shoppingList) ) {
            props.getShoppingListItems(props.shoppingList.id, props.authToken);
            setInitialized(true);
        } else if (initialized && props.itemsStale) {
            props.getShoppingListItems(props.shoppingList.id, props.authToken);
        }
    });


    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event) => {
        event.preventDefault();
        setAnchorEl(null);

    };

    const handleDelete = () => {
        props.deleteShoppingListItem(props.shoppingList.id, anchorEl.name, props.authToken);
        setAnchorEl(null);
    };

    return (
        <List>
            {props.shoppingListItems.map((item, index) => (
                <ListItem button key={item.id}>
                    <ListItemIcon><ShoppingBasketIcon/></ListItemIcon>
                    <ListItemText primary={item.name} secondary={`Qty: ${item.quantity}`}/>
                    <ListItemSecondaryAction>
                        <IconButton
                            name={item.id}
                            aria-controls="shopping-list-time-menu"
                            aria-haspopup="true"
                            onClick={handleMenuClick}
                        >
                            <MoreVertIcon/>
                        </IconButton>
                        <Menu
                            id='shopping-list-time-menu'
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleMenuClose}>
                                <ListItemIcon>
                                    <CreateIcon/>
                                </ListItemIcon>
                                Edit
                            </MenuItem>
                            <MenuItem button onClick={handleDelete}>
                                <ListItemIcon>
                                    <DeleteIcon/>
                                </ListItemIcon>
                                Delete
                            </MenuItem>
                        </Menu>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    );
};

const mapStateToProps = state => ({
    authToken: state.userReducer.authToken,
    shoppingList: state.shoppingListReducer.shoppingList,
    shoppingListItems: state.shoppingListItemReducer.shoppingListItems,
    shoppingListItem: state.shoppingListItemReducer.shoppingListItem,
    itemsStale: state.shoppingListItemReducer.itemsStale,
});

export default connect(mapStateToProps, shoppingListItemActions)(ShoppingListItem);

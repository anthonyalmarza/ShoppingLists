import React, { useState, useEffect } from 'react';
import ListIcon from "@material-ui/icons/List";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {ListItemSecondaryAction} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import { connect } from "react-redux";
import shoppingListActions from 'state/actions/shoppingListActions';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";


const ShoppingLists = (props) => {
    const [ initialized, setInitialized ] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
        if (!initialized) {
            props.getShoppingLists(props.authToken);
            setInitialized(true);
        } else if (initialized && props.itemsStale) {
            props.getShoppingLists(props.authToken);
        }
    });

    const switchList = shoppingListId => () => {
        props.switchShoppingList(shoppingListId, props.authToken)
    };

    function handleMenuClick(event) {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = (event) => {
        event.preventDefault();
        setAnchorEl(null);

    };

    const handleDelete = (event) => {
        props.deleteShoppingList(anchorEl.name, props.authToken);
        setAnchorEl(null);
    };

    return (
        <List>
            {props.shoppingLists.map((shoppingList, idx) => {
                return (
                    <ListItem
                        button
                        key={shoppingList.id}
                        selected={shoppingList.id === props.shoppingList.id}
                        onClick={switchList(shoppingList.id)}
                    >
                        <ListItemIcon><ListIcon/></ListItemIcon>
                        <ListItemText primary={shoppingList.name}/>
                        <ListItemSecondaryAction>
                            <IconButton name={shoppingList.id} aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick}>
                                <MoreVertIcon/>
                            </IconButton>
                            <Menu
                                id='simple-menu'
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
                )
            })}
        </List>
    );
};

const mapStateToProps = state => ({
    shoppingLists: state.shoppingListReducer.shoppingLists,
    shoppingList: state.shoppingListReducer.shoppingList,
    itemsStale: state.shoppingListReducer.itemsStale,
    authToken: state.userReducer.authToken
});

export default connect(mapStateToProps, shoppingListActions)(ShoppingLists);
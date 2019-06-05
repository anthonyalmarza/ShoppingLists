import React from 'react';
import AddShoppingListItemButton from 'components/AddShoppingListItemButton';
import AddShoppingListButton from 'components/AddShoppingListButton';
import ShoppingListItems from 'components/ShoppingListItems';
import ShoppingLists from 'components/ShoppingLists';
import DashboardPage from 'containers/DashboardPage';

const ShoppingListPage = () => {
    return (
        <DashboardPage
            title={"Shopping Lists"}
            mainContent={<ShoppingListItems/>}
            drawerContent={<ShoppingLists/>}
            mainActionButton={<AddShoppingListItemButton/>}
            drawerActionButton={<AddShoppingListButton/>}
        />
    );
};

export default ShoppingListPage;
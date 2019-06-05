import React from 'react';
import 'App.css';
import { Provider } from 'react-redux';
import ShoppingListPage from 'containers/ShoppingListPage';
import store from 'state/store';


function App() {
  return (
      <Provider store={store}>
          <div className="App">
              <ShoppingListPage />
          </div>
      </Provider>

  );
}

export default App;

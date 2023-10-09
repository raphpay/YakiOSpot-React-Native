import React from 'react';
import { Provider } from 'react-redux';

import store from './src/business-logic/redux/store';

import Navigation from './src/ui/navigation/Navigation';

function App() {

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;

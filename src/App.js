import React from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header';
import store from './store';
import './App.scss';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
    </Provider>
  );
};

export default App;

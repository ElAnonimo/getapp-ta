import React from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header';
import store from './store';
import './App.scss';

const App = () => {
  return (
    <div className='app'>
      <Provider store={store}>
        <Header />
      </Provider>
    </div>
  );
};

export default App;

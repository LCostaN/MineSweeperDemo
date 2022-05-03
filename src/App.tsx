import React from 'react';
import { Provider } from "react-redux";
import './App.scss';
import store from "./app/redux/store";
import Home from "./app/containers/home";


function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;

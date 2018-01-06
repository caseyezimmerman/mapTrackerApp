import { AppRegistry } from 'react-native';
import App from './App';
import React, { Component } from 'react'
import { Provider } from 'react-redux';
// import store from './redux';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './src/reducers';
import { StackNavigator } from 'react-navigation';
import reduxPromise from 'redux-promise'
// import AppRouter from './router'
import { connect } from 'react-redux'



// let store = createStore(rootReducer);
const store = applyMiddleware(reduxPromise)(createStore)(rootReducer)

export default class mapTrackerApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}


AppRegistry.registerComponent('mapTrackerApp', () => App);

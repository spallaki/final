import React from 'react';
import {Provider} from 'react-redux';
import AppContainer from './AppContainer.js';
import {View} from 'react-native';
import { configureStore } from '../store/configureStore';

const store = configureStore();

export default function Root({ }) {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

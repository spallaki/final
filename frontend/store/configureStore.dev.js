import { createStore, compose } from 'redux';
import rootReducer from '../reducers';

export function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
  );
}

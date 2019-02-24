import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import songReducer from './songReducer';

const reducer = combineReducers({ songReducer });
const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);
const store = createStore(reducer, middleware);

export default store;

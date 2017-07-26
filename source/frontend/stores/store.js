import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers/reducer';

const devtools = '__REDUX_DEVTOOLS_EXTENSION__';
const loggerMiddleware = createLogger();
const store = createStore(
  reducer,
  compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
    window[devtools] && window[devtools](),
  ),
);
export default store;

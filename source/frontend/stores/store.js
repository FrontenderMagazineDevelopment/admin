import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import createReduxWaitForMiddleware from 'redux-wait-for-action';
import { applyMiddleware, compose, createStore } from 'redux';

import reducer from '../reducers/reducer';
import { rootSaga } from '../components/person/sagas/';

import { readRequest } from '../components/person/actions';

const sagaMiddleware = createSagaMiddleware();
const WaitForMiddleware = createReduxWaitForMiddleware();

const devtools = '__REDUX_DEVTOOLS_EXTENSION__';
const loggerMiddleware = createLogger();
const store = createStore(
  reducer,
  compose(
    applyMiddleware(
      sagaMiddleware,
      WaitForMiddleware,
      loggerMiddleware,
    ),
    window[devtools] && window[devtools](),
  ),
);

sagaMiddleware.run(rootSaga);


store.dispatch(readRequest());


export default store;

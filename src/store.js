import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { connectRouter, routerMiddleware, push } from 'connected-react-router';
import persistState from 'redux-localstorage';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import createElectronStorage from "redux-persist-electron-storage";



import thunk from 'redux-thunk';

import user from './reducers/user';
import userActions from './actions/user';

export default function configureStore(initialState, routerHistory) {
  const sagaMiddleware = createSagaMiddleware();
  const persistConfig = {
    key: 'root',
    storage: createElectronStorage()
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  // const router = routerMiddleware(routerHistory);

  // const actionCreators = {
  //   ...userActions,
  //   push,
  // };

  // const reducers = {
  //   router: connectRouter(routerHistory),
  //   user
  // };

  const middlewares = [ router ];

  // const composeEnhancers = (() => {
  //   const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  //   if (process.env.NODE_ENV === 'development' && compose_) {
  //     return compose_({ actionCreators });
  //   }
  //   return compose;
  // })();

  // const enhancer = composeEnhancers(applyMiddleware(...middlewares), persistState());
  // const rootReducer = combineReducers(reducers);

  return createStore(persistedReducer, initialState, enhancer,
    applyMiddleware(sagaMiddleware, logger)
    );
}

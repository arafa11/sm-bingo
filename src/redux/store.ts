import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = { key: "root", storage, };

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(thunk)),
);

export default store;

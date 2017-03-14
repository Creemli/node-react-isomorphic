/**
 * Created by lixiaoxi on 16/6/7.
 * @description
 */

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';




export default function configureStore(initialState = {}, history) {
  const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
  )(createStore);

  const store = createStoreWithMiddleware(rootReducer);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

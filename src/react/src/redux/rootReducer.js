/**
 * Created by lixiaoxi on 16/6/7.
 * @description
 */

import { combineReducers } from 'redux';

import reducers from './modules';

export default combineReducers({

  ...reducers,
});

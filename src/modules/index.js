import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import collection from './collection';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    collection,
  });

export default rootReducer;

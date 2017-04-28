import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import Counter from './Counter';

const rootReducer = combineReducers({
    Counter,
    routing: routerReducer
});

export default rootReducer;

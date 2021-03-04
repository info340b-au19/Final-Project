import { createStore, applyMiddleware, combineReducers } from 'redux';
import navReducer from './appReducer';
import expReducer from './exploreReducer';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
//import thunk from 'redux-thunk';


const combineReducer = combineReducers({
    explore: expReducer,
    navigate: navReducer
})

const store = createStore(
    combineReducer,
    applyMiddleware(logger, ReduxThunk)
    );

export default store;
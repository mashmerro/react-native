import { createStore, combineReducers, applyMiddleware } from 'redux';
/*
    'createStore'   : holds complete state of the app
    'combineReducers' : reducing one single state object from createStore
    'applyMiddleware' : adds more redux functionality
*/
import thunk from 'redux-thunk';            // dispatch and get state
import logger from 'redux-logger';          // gives a traceable stack of user's action (good for errors)
// Objects array for server data
import { campsites } from './campsites';
import { comments } from './comments';
import { promotions } from './promotions';
import { partners } from './partners';
import { favorites } from './favorites';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            campsites,
            comments,
            partners,
            promotions,
            favorites
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};
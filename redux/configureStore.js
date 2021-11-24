import { createStore, combineReducers, applyMiddleware } from 'redux';
/*
    'createStore'   : holds complete state of the app
    'combineReducers' : reducing one single state object from createStore
    'applyMiddleware' : adds more redux functionality
*/
import thunk from 'redux-thunk';                    // dispatch and get state
import logger from 'redux-logger';                  // gives a traceable stack of user's action (good for errors)
// Objects array for server data
import { campsites } from './campsites';
import { comments } from './comments';
import { promotions } from './promotions';
import { partners } from './partners';
import { favorites } from './favorites';
import { persistStore, persistCombineReducers } from 'redux-persist';   // add persist support automatically updates when there's a change to state
import storage from 'redux-persist/es/storage';     // access to local storage from our device

const config = {    // 1st 2 props required
    key: 'root',
    storage,        // imported
    debug: true     // redux persist console log messages to debug
}

export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {    // 1st arg is the object we created will handle updating the state automatically from redux store
            campsites,
            comments,
            partners,
            promotions,
            favorites
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store);  // persistStore has redux store as arg
    return {persistor, store};              // to access both in App.js
};
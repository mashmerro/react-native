import * as ActionTypes from './ActionTypes';                        // imports all exported Action types

export const campsites = (state = { isLoading: true,                 // initializing the campsite section of the state 
                                     errMess: null,
                                     campsites: []}, action) => {    // takes that action and creates/returns new state depending on the condition below
    switch (action.type) {
        case ActionTypes.ADD_CAMPSITES:
            return {...state, isLoading: false, errMess: null, campsites: action.payload};

        case ActionTypes.CAMPSITES_LOADING:
            return {...state, isLoading: true, errMess: null, campsites: []}

        case ActionTypes.CAMPSITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      }
};
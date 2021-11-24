import * as ActionTypes from './ActionTypes';

// Reducer
export const favorites = (state = [], action) => {
    // Check for action type
    switch(action.type) {
        case ActionTypes.ADD_FAVORITE:
            if (state.includes(action.payload)) {
                return state;
            }
            return state.concat(action.payload);
        case ActionTypes.DELETE_FAVORITE:
            return state.filter(favorite => favorite !== action.payload); 
            // Creates a new array that no longer contains campsite id we are deleting
        default:
            return state;
    }
}
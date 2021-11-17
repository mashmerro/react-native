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
        default:
            return state;
    }
}
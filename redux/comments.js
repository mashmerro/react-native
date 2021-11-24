import * as ActionTypes from './ActionTypes';

export const comments = (state = { errMess: null, comments: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};

        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;         // store action payload (newComment data)
            comment.id = state.comments.length;     // set an id to existing comments length array
            return {...state, comments: state.comments.concat(comment)};    // override comment section
        default:
            return state;
    }
};
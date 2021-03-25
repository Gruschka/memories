import * as types from '../../actions/posts/types';

export default (state = {currentId: null, posts: []}, action) => {

    switch(action.type){

        case types.SELECT_ID:
            return {...state, currentId: action.payload};

        case types.FETCH_ALL:
            return {...state, posts: action.payload};
        
        case types.CREATE:
            return {...state, posts: [...state.posts, action.payload]};

        case types.UPDATE:
        case types.LIKE:
            return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};    

        case types.DELETE:
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload)};    
    
        default: 
            return state;
    }

}
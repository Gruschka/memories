export default (state = {currentId: null, posts: []}, action) => {

    switch(action.type){

        case 'SELECT_ID':
            return {...state, currentId: action.payload};

        case 'FETCH_ALL':
            return {...state, posts: action.payload};
        
        case 'CREATE':
            return {...state, posts: [...state.posts, action.payload]};

        case 'UPDATE':
        case 'LIKE':
            return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};    

        case 'DELETE':
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload)};    

    

        default: 
            return state;
    }

}
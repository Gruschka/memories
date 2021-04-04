import * as types from '../../actions/auth/types';

const auth = (state = { authData: null }, action) => {
    switch (action.type) {
        case types.AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data };
            break;
    
        case types.LOGOUT:
            localStorage.clear()
            return { ...state, authData: null };
            break;
            
        default:
            return state
            break;
    }
}

export default auth;
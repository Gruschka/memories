import { combineReducers } from 'redux';
import posts from './posts/reducer';
import auth from './auth/index'

export default combineReducers({
    posts,
    auth
});
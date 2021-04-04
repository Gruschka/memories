import * as types from './types';
import * as api from '../../api/index';

export function auth(authResponse, history) {
    return async (dispatch) => {
        const result = authResponse?.profileObj;
        const token = authResponse?.tokenId;
        try {
            dispatch({ type: types.AUTH, data: { result, token } })
            history.push('/')
        } catch (error) {
            console.log(`error`, error)
        }
    }
}

export function logout(){
    return (dispatch) => {
        dispatch( { type: types.LOGOUT })
    }
}

export function signIn(formData, history){
    return async (dispatch) => {
        try {
            //login...
            history.push('/');
        } catch (error) {
            console.log(`error`, error)
        }
    }
}

export function signUp(formData, history){
    return async (dispatch) => {
        try {
            //login...
            history.push('/');
        } catch (error) {
            console.log(`error`, error)
        }
    }
}

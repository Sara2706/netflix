import axios from 'axios'
import {loginStart, loginFailure, loginSuccess, logoutStart} from './AuthActions'

export const login = async(user,dispatch)=>{
    dispatch(loginStart());

    try {
        const res = await axios.post('auth/login',user);
        res.data.user.isAdmin && dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
}

export const logout = async(user,dispatch)=>{
    dispatch(logoutStart())
}
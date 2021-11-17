import axios from 'axios'
import { loginFailure, loginStart, loginSuccess } from './authActions'

export const login=async(user,dispatch)=>{
    dispatch(loginStart());
    try {
        const res= await axios.post('/user/login',user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
}
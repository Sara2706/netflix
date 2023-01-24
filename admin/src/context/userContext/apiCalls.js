import axios from "axios";
import {getUsersStart, getUsersSuccess, getUsersFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, createUserStart, createUserSuccess, createUserFailure, updateUserStart,updateUserSuccess,updateUserFailure } from "./UserActions"

export const getUsers = async(dispatch) => {
    dispatch(getUsersStart());

    try {
        const res = await axios.get('/users', {headers:{token:'Bearer '+JSON.parse(localStorage.getItem("user")).accessToken}});
        dispatch(getUsersSuccess(res.data))
    } catch (error) {
        dispatch(getUsersFailure());
    }
}

export const deleteUser = async(id,dispatch) => {
    dispatch(deleteUserStart());
    
    try {
        await axios.delete('/users/'+id, {headers:{token:'Bearer '+JSON.parse(localStorage.getItem("user")).accessToken},});
        dispatch(deleteUserSuccess(id))
    } catch (error) {
        dispatch(deleteUserFailure());
    }
}

export const createUser = async(list,dispatch) => {
    dispatch(createUserStart());

    try {
        const res = await axios.post('/auth/register',list, {headers:{token:'Bearer '+JSON.parse(localStorage.getItem("user")).accessToken},});
        dispatch(createUserSuccess(res.data))
    } catch (error) {
        dispatch(createUserFailure());
    }
}

export const updateUser = async(id,user,dispatch) => {
    dispatch(updateUserStart());
    try {
        const res = await axios.put('/users/'+id,user, {headers:{token:'Bearer '+JSON.parse(localStorage.getItem("user")).accessToken},});
        dispatch(updateUserSuccess(res.data))
        
    } catch (error) {
        dispatch((updateUserFailure()));
    }
}
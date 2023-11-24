import axios from "axios"

axios.defaults.baseURL = "http://localhost:3001";

export const ACTUAL_USER = 'ACTUAL_USER';
export const USER_LOGOUT_DELETE = 'USER_LOGOUT_DELETE';

//action para obtener user por email y guardarlo en el estado global User

export const getUserByEmail = (email) => {
    return async function (dispatch) {
        const response = await axios.get(`/users/${email}`);
        return dispatch({
            type: ACTUAL_USER,
            payload: response.data
        })
    }
}

// Vaciar el usuario que cerró sesión

export const deleteUserLogout = () => {
    return {
        type: USER_LOGOUT_DELETE
    }
}

//action para realizar el login del usuario

const config = {
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
}

export const loginUser = (loginData) => {
    return async function (dispatch) {
        try {
            const response = await axios.post(`/users/login`, loginData, config);
            return (response.data);
        } catch (error) {
            return (error);
        }
    }
}

// Logout action

export const logoutUser = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`/logout`, config);
            return (response.data);
        } catch (error) {
            return (error);
        }
    }
}

// Verifica en el server si existe una sesión activa


export const verificarSesion = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`/checkSession`, config);
            return response;
        } catch (error) {
            return (error.response);
        }
    }
}

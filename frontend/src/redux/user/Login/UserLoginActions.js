import {
    FETCH_USERLOGIN_FAILURE, FETCH_USERLOGIN_SUCCESS,
    FETCH_USERLOGIN_REQUEST, UPDATE_CREDS_SUCCESS
}
    from "./UserLoginActionTypes"

import axios from "axios"
import API_BASE_URL from "../../../utils/constants"

export const fetchUserLoginRequest = () => {
    return {
        type: FETCH_USERLOGIN_REQUEST
    }
}

export const fetchUserLoginSuccess = credential => {
    return {
        type: FETCH_USERLOGIN_SUCCESS,
        payload: credential
    }
}

export const fetchUserLoginFailure = error => {
    return {
        type: FETCH_USERLOGIN_FAILURE,
        payload: error
    }
}

const fetchUserLogin = (currentUser) => {

    return (dispatch) => {
        dispatch(fetchUserLoginRequest)

        axios.get(`${API_BASE_URL}}/credentials/${currentUser}`)
            .then(result => {
                const credentials = result.data;

                console.log("LOGIN USER DEETS:", credentials)
                dispatch(fetchUserLoginSuccess(credentials))

            }).catch(error => {
                const errorMsg = error.message;
                dispatch(fetchUserLoginFailure(errorMsg))
            })
    }
}

export const updateCreds = (credId, credData) => {
    console.log("CRED", credData)
    return (dispatch) => {
        axios.put(`${API_BASE_URL}/credentials/${credId}`, {
            email: credData.email
        }).then(response => {
            console.log("updated payload", response.data);
            dispatch({
                type: UPDATE_CREDS_SUCCESS,
                payload: response.data
            })
        }).catch(err => {
            console.log(err)
        })

    }

}

export default fetchUserLogin
import {
    FETCH_RESTLOGIN_FAILURE, FETCH_RESTLOGIN_SUCCESS,
    FETCH_RESTLOGIN_REQUEST
}
    from "./RestLoginActionTypes"

import axios from "axios"
import API_BASE_URL from "../../../utils/constants"

export const fetchRestLoginRequest = () => {
    return {
        type: FETCH_RESTLOGIN_REQUEST
    }
}

export const fetchRestLoginSuccess = credential => {
    return {
        type: FETCH_RESTLOGIN_SUCCESS,
        payload: credential
    }
}

export const fetchRestLoginFailure = error => {
    return {
        type: FETCH_RESTLOGIN_FAILURE,
        payload: error
    }
}

const fetchRestLogin = (currentRest) => {
    return (dispatch) => {
        dispatch(fetchRestLoginRequest)

        axios.get(`${API_BASE_URL}/credentials/${currentRest}`)
            .then(result => {
                const credentials = result.data;

                dispatch(fetchRestLoginSuccess(credentials))

            }).catch(error => {
                const errorMsg = error.message;
                dispatch(fetchRestLoginFailure(errorMsg))
            })
    }
}

export default fetchRestLogin
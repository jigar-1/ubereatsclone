import {
    FETCH_USERS_FAILURE, FETCH_USERS_SUCCESS,
    FETCH_USERS_REQUEST, UPDATE_CUST_SUCCESS, UPDATE_CUST_ADD_SUCCESS
}
    from "./UserActionTypes"

import axios from "axios"
import API_BASE_URL from "../../../utils/constants"

export const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

export const fetchUserSuccess = user => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: user
    }
}

export const fetchUserFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

export const updateCust = (custDataId, custData) => {

    return (dispatch) => {
        axios
            .put(`${API_BASE_URL}/customers/${custDataId}`, custData)
            .then(response => {

                console.log("updated payload", response.data);

                dispatch({
                    type: UPDATE_CUST_ADD_SUCCESS,
                    payload: response.data
                })


            }).catch(error => {
                console.log(error)
            })

    }

}

export const updateCustomerAdd = (custDataId, custDataAdd) => {

    return (dispatch) => {
        axios
            .put(`${API_BASE_URL}/custAddress/${custDataId}`, custDataAdd)
            .then(response => {

                console.log("updated payload", response.data);
                dispatch({
                    type: UPDATE_CUST_ADD_SUCCESS,
                    payload: response.data
                })


            }).catch(error => {
                console.log(error)
            })

    }

}


const fetchUser = (currentUser) => {
    return (dispatch) => {
        dispatch(fetchUserRequest)

        axios.get(`${API_BASE_URL}/custfromCred/${currentUser}`)
            .then(result => {
                const user = result.data;

                dispatch(fetchUserSuccess(user))
            }).catch(error => {
                const errorMsg = error.message;
                dispatch(fetchUserFailure(errorMsg))
            })
    }
}

export default fetchUser
import { FETCH_REST_FAILURE, FETCH_REST_SUCCESS, FETCH_REST_REQUEST, UPDATE_REST_SUCCESS }
    from "./RestActionTypes"

import axios from "axios"
import API_BASE_URL from "../../../utils/constants"

export const fetchRestRequest = () => {
    return {
        type: FETCH_REST_REQUEST
    }
}

export const fetchRestSuccess = rest => {
    return {
        type: FETCH_REST_SUCCESS,
        payload: rest
    }
}

export const fetchRestFailure = error => {
    return {
        type: FETCH_REST_FAILURE,
        payload: error
    }
}

export const updateRest = (restDataId, restData) => {
    return (dispatch) => {
        axios
            .put(`${API_BASE_URL}/restaurants/${restDataId}`, restData)
            .then(response => {

                const restData = response.data;

                console.log("update payload", response.data);
                dispatch({
                    type: UPDATE_REST_SUCCESS,
                    payload: response.data
                })
            }).catch(error => {
                console.log(error)
            })

    }

}


const fetchRest = (currentRest) => {
    return (dispatch) => {
        dispatch(fetchRestRequest)

        axios.get(`${API_BASE_URL}/custfromCred/${currentRest}`)
            .then(result => {
                const rest = result.data;

                dispatch(fetchRestSuccess(rest))
            }).catch(error => {
                const errorMsg = error.message;
                dispatch(fetchRestFailure(errorMsg))
            })
    }
}

export default fetchRest

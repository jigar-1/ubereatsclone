import {
    FETCH_LOCATION_FAILURE, FETCH_LOCATION_SUCCESS, FETCH_LOCATION_REQUEST,
    UPDATE_CUSTADD_SUCCESS
}
    from "./LocationActionTypes"


import axios from "axios"
import API_BASE_URL from "../../../utils/constants"

export const fetchLocationRequest = () => {
    return {
        type: FETCH_LOCATION_REQUEST
    }
}

export const fetchLocationSuccess = location => {
    console.log("fecthLOCSUCESS", location)
    return {
        type: FETCH_LOCATION_SUCCESS,
        payload: location
    }
}

export const fetchLocationFailure = error => {
    return {
        type: FETCH_LOCATION_FAILURE,
        payload: error
    }
}

const fetchLocation = (currentUser) => {
    return (dispatch) => {
        dispatch(fetchLocationRequest)

        axios.get(`${API_BASE_URL}/custAddress/${currentUser}`)
            .then(result => {
                const location = result.data;
                dispatch(fetchLocationSuccess(location))
            }).catch(error => {
                const errorMsg = error.message;
                dispatch(fetchLocationFailure(errorMsg))
            })
    }
}

export const updateCustAdd = (custDataId, custDataAdd) => {
    return (dispatch) => {
        axios.put(`${API_BASE_URL}/custAddress/${custDataId}`,
            custDataAdd).then(response => {
                console.log("updated payload", response.data);
                dispatch({
                    type: UPDATE_CUSTADD_SUCCESS,
                    payload: response.data
                })
            }).catch(err => {
                console.log(err)
            })


        // axios
        //     .put(`${API_BASE_URL}/customers/${custDataId}`, custDataAdd)
        //     .then(response => {

        //         console.log("updated payload", response.data);
        //         dispatch({
        //             type: UPDATE_CUST_SUCCESS,
        //             payload: response.data
        //         })


        //     }).catch(error => {
        //         console.log(error)
        //     })

    }

}

export default fetchLocation
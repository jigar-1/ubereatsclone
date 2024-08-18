import {
    FETCH_RESTSIGNUP_FAILURE, FETCH_RESTSIGNUP_SUCCESS,
    FETCH_RESTSIGNUP_REQUEST
}
    from "./RestSignupActionTypes"

import axios from "axios"
import API_BASE_URL from "../../../utils/constants"

export const fetchRestSignupRequest = () => {
    return {
        type: FETCH_RESTSIGNUP_REQUEST
    }
}

export const fetchRestSignupSuccess = payload => {
    return {
        type: FETCH_RESTSIGNUP_SUCCESS,
        payload
    }
}

export const fetchRestSignupFailure = error => {
    return {
        type: FETCH_RESTSIGNUP_FAILURE,
        payload: error
    }
}

const fetchRestSignup = (restCreds, restDetails) => {
    return async (dispatch) => {

        dispatch(fetchRestSignupRequest)
        try {
            // const response1 = await axios.post(`${API_BASE_URL}/credentials`, restCreds)
            // const response2 = await axios.post(`${API_BASE_URL}/restaurants`, {
            //     ...restDetails,
            //     credsId: response1.data.id
            // })
            const response = await axios.post(`${API_BASE_URL}/restaurants`, restDetails)
            dispatch({
                type: FETCH_RESTSIGNUP_SUCCESS,
                // payload: { ...response1.data, ...response2.data }
                payload: { ...response.data }

            })
            // return { response1, response2 }
        }
        catch (err) {
            throw err
        }


        // axios.get(`http://localhost:5000/credentials/${currentRest}`)
        //     .then(result => {
        //         const credentials = result.data;

        //         dispatch(fetchRestSignupSuccess(credentials))

        //     }).catch(error => {
        //         const errorMsg = error.message;
        //         dispatch(fetchRestSignupFailure(errorMsg))
        //     })
    }
}

export default fetchRestSignup
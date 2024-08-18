import {
    FETCH_FAVOURITE_FAILURE, FETCH_FAVOURITE_SUCCESS,
    FETCH_FAVOURITE_REQUEST, ADD_FAVOURITE_SUCCESS, DEL_FAVOURITE_SUCCESS
}
    from "./FavouriteActionTypes"

import axios from "axios"
import API_BASE_URL from '../../../utils/constants'

export const fetchFavouriteRequest = () => {
    return {
        type: FETCH_FAVOURITE_REQUEST
    }
}

export const fetchFavouriteSuccess = favourite => {
    console.log("fav", favourite)
    return {
        type: FETCH_FAVOURITE_SUCCESS,
        payload: favourite
    }
}

export const fetchFavouriteFailure = error => {
    return {
        type: FETCH_FAVOURITE_FAILURE,
        payload: error
    }
}

export const addFavouriteSuccess = favData => {
    return {
        type: ADD_FAVOURITE_SUCCESS,
        payload: favData
    }
}

export const delFavouriteSuccess = unfav => {
    console.log("UNFAV:", unfav)
    return {
        type: DEL_FAVOURITE_SUCCESS,
        payload: unfav

    }
}
const fetchFavourite = (custId) => {
    return (dispatch) => {
        dispatch(fetchFavouriteRequest)

        axios.get(`${API_BASE_URL}/getFavourites/${custId}`)
            .then(result => {
                const favourite = result.data;
                console.log("FAF", favourite)
                dispatch(fetchFavouriteSuccess(favourite))

            }).catch(error => {
                const errorMsg = error.message;
                dispatch(fetchFavouriteFailure(errorMsg))
            })
    }
}

export const addFavourite = (favData) => {
    return (dispatch) => {
        console.log("FAV", favData)
        axios.put(`${API_BASE_URL}/addRestToFav`, favData)
            .then(result => {
                const favourite = result.data;

                console.log("in fav action", favourite)
                dispatch(addFavouriteSuccess(favourite))

            }).catch(error => {
                const errorMsg = error.message;
                console.log(errorMsg)
                // dispatch(fetchFavouriteFailure(errorMsg))
            })
    }

}
export const delFavourite = (id, custId) => {
    return (dispatch) => {

        axios.delete(`${API_BASE_URL}/delFav/${custId}/${id}`)
            .then(result => {
                // const updatedList=result.data
                console.log("sss")
                dispatch(delFavouriteSuccess(id))

                // dispatch(fetchFavouriteSuccess())
            }).catch(error => {
                const errorMsg = error.message;
                console.log(errorMsg)
            })
    }
}
export default fetchFavourite
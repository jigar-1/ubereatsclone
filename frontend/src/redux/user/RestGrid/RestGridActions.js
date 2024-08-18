import {
    FETCH_RESTAURANTS_FAILURE, FETCH_RESTAURANTS_SUCCESS, FETCH_RESTAURANTS_REQUEST, FILTER_RESTAURANTS_DELIVERY,
    FILTER_RESTAURANTS_PICKUP,
    ONLY_PICKUP,
    ONLY_DELIVERY,
    ADD_SEARCH_TEXT,
    GET_RESTID_FROM_DISH, GET_RESTID_FROM_TYPE
} from "./RestGridActionTypes"
import axios from "axios"
import API_BASE_URL from "../../../utils/constants"

export const fetchRestaurantsRequest = () => {
    return {
        type: FETCH_RESTAURANTS_REQUEST
    }
}

export const fetchRestaurantsSuccess = restaurants => {
    return {
        type: FETCH_RESTAURANTS_SUCCESS,
        payload: restaurants

    }
}

export const fetchRestaurantsFailure = error => {
    return {
        type: FETCH_RESTAURANTS_FAILURE,
        payload: error
    }
}


export const onlyPickup = error => {
    return {
        type: ONLY_PICKUP,
        payload: error
    }
}
export const onlyDelivery = error => {
    return {
        type: ONLY_DELIVERY,
        payload: error
    }
}

export const addSearchText = text => {
    return {
        type: ADD_SEARCH_TEXT,
        payload: text
    }
}

export const getRestIdFromDish = restIds => {

    return {
        type: GET_RESTID_FROM_DISH,
        payload: restIds
    }
}

export const getRestIdFromType = restIds => {
    console.log("inside type action")
    return {
        type: GET_RESTID_FROM_TYPE,
        payload: restIds
    }
}


export const fetchRestaurants = (city) => {
    console.log("City in fetch restaurant for RestGrid", city)
    let payload = {
        city
    }
    return (dispatch) => {
        dispatch(fetchRestaurantsRequest)


        axios
            .get(`${API_BASE_URL}/restaurants`, { params: payload })
            .then(result => {
                const rest = result.data;
                dispatch(fetchRestaurantsSuccess(rest))
            }).catch(error => {
                const errorMsg = error.message;
                dispatch(fetchRestaurantsFailure(errorMsg))
            })

    }
}




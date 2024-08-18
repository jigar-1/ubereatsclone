import RestSignup from "../../../components/restaurant/RestSignUp"
import { fetchRestSignupRequest } from "../../Restaurant/Signup/RestSignupActions"
import {
    ADD_SEARCH_TEXT, FETCH_RESTAURANTS_FAILURE, FETCH_RESTAURANTS_REQUEST, FETCH_RESTAURANTS_SUCCESS,
    FILTER_RESTAURANTS_DELIVERY, FILTER_RESTAURANTS_PICKUP, ONLY_DELIVERY, ONLY_PICKUP,
    GET_RESTID_FROM_DISH, GET_RESTID_FROM_TYPE
} from "./RestGridActionTypes"

const initialState = {
    loading: false,
    restaurants: [],
    dishRestIds: [],
    typeRestIds: [],
    isPickup: 0,
    isDelivery: 1,
    searchText: "",
    error: ''

}

const restGridReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RESTAURANTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_RESTAURANTS_SUCCESS:
            return {

                ...state,
                loading: false,
                restaurants: action.payload,
                error: ''
            }
        case FETCH_RESTAURANTS_FAILURE:

            return {

                ...state,
                loading: false,
                restaurants: [],
                error: action.payload
            }
        case ONLY_PICKUP:
            return {
                ...state,
                isPickup: 1,
                isDelivery: 0
            }
        case ONLY_DELIVERY:
            return {
                ...state,
                isPickup: 0,
                isDelivery: 1
            }
        case ADD_SEARCH_TEXT:

            {
                // console.log("inside add text")
                return {
                    ...state,
                    searchText: action.payload
                }
            }
        case GET_RESTID_FROM_TYPE: {
            console.log("from reducer: ", action.payload)
            return {
                ...state,
                typeRestIds: action.payload
            }
        }
        case GET_RESTID_FROM_DISH: {
            return {
                ...state,
                dishRestIds: action.payload
            }
        }

        default: return state;
    }
}

export default restGridReducer
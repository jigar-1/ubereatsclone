import {
    ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, SET_CURRENT_REST, MODAL_TOGGLE, DELETE_ITEM, SET_NEW_REST, SET_NEW_ORDER_ITEM, SET_ORDER_MODE
} from "./CartActionTypes"

import axios from "axios"
import API_BASE_URL from "../../../utils/constants"

export const addToCart = (addItem) => {
    return {
        type: ADD_TO_CART,
        payload: addItem
    }
}

export const removeFromCart = removeItem => {
    return {
        type: REMOVE_FROM_CART,
        payload: removeItem
    }
}

export const deleteItem = item => {
    return {
        type: DELETE_ITEM,
        payload: item
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}

export const setCurrentRest = currentRest => {
    return {
        type: SET_CURRENT_REST,
        payload: currentRest

    }
}
export const setNewRest = newRest => {
    return {
        type: SET_NEW_REST,
        payload: newRest

    }
}

export const setNewOrderItem = item => {
    return {
        type: SET_NEW_ORDER_ITEM,
        payload: item

    }
}


export const modalToggle = show => {
    return {
        type: MODAL_TOGGLE,
        payload: show
    }
}

export const setOrderMode = mode => {
    return {
        type: SET_ORDER_MODE,
        payload: mode
    }
}


export const addItemToCart = (dishId, currentRest) => {
    console.log("asdadasdasd", dishId)

    return (dispatch) => {

        dispatch(setCurrentRest(currentRest))


        axios
            .get(`${API_BASE_URL}/dishes/${currentRest.restId}/${dishId}`)
            .then(result => {
                // console.log("RRRRRRRRR", result.data)
                const item = { ...result.data }
                // console.log(result.data)
                // console.log("RRRRRRRRR", item)
                dispatch(addToCart(item))

            })
            .catch(err => {
                console.log(err)
            })
    }

}

export const removeItemFromCart = (dishId) => {

    return (dispatch) => {
        console.log(dishId)
        dispatch(removeFromCart(dishId))
    }

}
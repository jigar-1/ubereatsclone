import {
    ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, SET_CURRENT_REST, DELETE_ITEM, MODAL_TOGGLE, SET_NEW_REST, SET_NEW_ORDER_ITEM, SET_ORDER_MODE
} from "./CartActionTypes"
import { addItemUtil, checkCurrent, count, delFullItem, delItemUtil } from "./CartUtils"

const initialState = {
    cartItems: [],
    newOrderItem: {},
    cartQuantity: 0,
    currentRest: {},
    newRest: {},
    orderMode: "Delivery",
    modal: false
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,

                cartItems: addItemUtil(state.cartItems, action.payload),
                cartQuantity: state.cartQuantity + 1,
                // currentRest:
            }

        case REMOVE_FROM_CART:

            // console.log("in red", action.payload)
            return {

                ...state,
                cartItems: delItemUtil(state.cartItems, action.payload),
                cartQuantity: state.cartQuantity === 0 ? 0 : state.cartQuantity - 1
            }

        case DELETE_ITEM:

            // console.log("in red", action.payload)
            return {

                ...state,
                cartItems: delFullItem(state.cartItems, action.payload),
                cartQuantity: state.cartQuantity === 0 ? 0 : state.cartQuantity - count(state.cartItems, state.cartQuantity, action.payload)
            }



        case CLEAR_CART:

            return {

                ...state,
                ...initialState

            }
        case SET_NEW_ORDER_ITEM:
            return {
                ...state,
                newOrderItem: action.payload//checkCurrent(state.currentRest, action.payload, state.modal)
            }
        case SET_CURRENT_REST:
            return {
                ...state,
                currentRest: action.payload//checkCurrent(state.currentRest, action.payload, state.modal)
            }
        case SET_NEW_REST:
            return {
                ...state,
                newRest: action.payload//checkCurrent(state.currentRest, action.payload, state.modal)
            }
        case MODAL_TOGGLE: {
            return {
                ...state,
                modal: action.payload
            }


        }
        case SET_ORDER_MODE: {
            return {
                ...state,
                orderMode: action.payload
            }
        }

        default: return state;
    }
}

export default cartReducer
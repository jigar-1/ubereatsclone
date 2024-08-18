
import {
    FETCH_USERS_FAILURE, FETCH_USERS_SUCCESS,
    FETCH_USERS_REQUEST, UPDATE_CUST_SUCCESS, UPDATE_CUST_ADD_SUCCESS
}
    from "./UserActionTypes"

const initialState = {
    loading: false,
    user: {},
    error: ''
}
const setAddress = (user, address) => {
    // console.log("U", user);
    // console.log("A", address)

    user.addresses[0].street = address.street;
    user.addresses[0].city = address.city;
    user.addresses[0].state = address.state;
    user.addresses[0].country = address.country;
    user.addresses[0].zipcode = address.zipcode;

    return user;
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                user: {},
                error: action.payload
            }
        case UPDATE_CUST_SUCCESS:
            return {
                ...state,
                loading: false,
                user: { ...state, ...action.payload },
                error: ''
            }
        case UPDATE_CUST_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                user: setAddress(state.user, action.payload),
                error: ''
            }

        default: return state;
    }
}

export default userReducer
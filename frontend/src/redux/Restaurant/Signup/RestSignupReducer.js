import {
    FETCH_RESTSIGNUP_FAILURE, FETCH_RESTSIGNUP_SUCCESS,
    FETCH_RESTSIGNUP_REQUEST
}
    from "./RestSignupActionTypes"


const initialState = {
    loading: false,
    details: {},
    error: ''
}

const restSignupReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RESTSIGNUP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_RESTSIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                details: action.payload,
                error: ''
            }
        case FETCH_RESTSIGNUP_FAILURE:
            return {
                ...state,
                loading: false,
                details: {},
                error: action.payload
            }
        default: return state;
    }
}

export default restSignupReducer
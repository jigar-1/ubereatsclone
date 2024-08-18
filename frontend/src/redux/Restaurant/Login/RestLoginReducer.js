import { FETCH_RESTLOGIN_FAILURE, FETCH_RESTLOGIN_SUCCESS, FETCH_RESTLOGIN_REQUEST }
    from "./RestLoginActionTypes"

const initialState = {
    loading: false,
    credentials: {},
    error: ''
}

const restLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RESTLOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_RESTLOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                credentials: action.payload,
                error: ''
            }
        case FETCH_RESTLOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                credentials: {},
                error: action.payload
            }
        default: return state;
    }
}

export default restLoginReducer
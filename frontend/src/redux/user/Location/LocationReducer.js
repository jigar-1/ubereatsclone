import { FETCH_LOCATION_FAILURE, FETCH_LOCATION_SUCCESS, FETCH_LOCATION_REQUEST, UPDATE_CUSTADD_SUCCESS }
    from "./LocationActionTypes"

const initialState = {
    loading: false,
    location: {},
    error: ''
}

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LOCATION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_LOCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                location: action.payload,
                error: ''
            }
        case FETCH_LOCATION_FAILURE:
            return {
                ...state,
                loading: false,
                location: {},
                error: action.payload
            }
        case UPDATE_CUSTADD_SUCCESS:
            return {
                ...state,
                loading: false,
                location: action.payload,
                error: ''
            }
        default: return state;
    }
}

export default locationReducer
import { FETCH_REST_FAILURE, FETCH_REST_SUCCESS, FETCH_REST_REQUEST, UPDATE_REST_SUCCESS }
    from "./RestActionTypes"

const initialState = {
    loading: false,
    rest: {},
    error: ''
}

const restReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_REST_SUCCESS:
            return {
                ...state,
                loading: false,
                rest: action.payload,
                error: ''
            }
        case FETCH_REST_FAILURE:
            return {
                ...state,
                loading: false,
                rest: {},
                error: action.payload
            }
        case UPDATE_REST_SUCCESS:
            return {
                ...state,
                loading: false,
                rest: { ...state, ...action.payload },
                error: ''
            }
        default: return state;
    }
}

export default restReducer
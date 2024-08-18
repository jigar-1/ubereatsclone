import {
    FETCH_USERLOGIN_FAILURE, FETCH_USERLOGIN_SUCCESS,
    FETCH_USERLOGIN_REQUEST, UPDATE_CREDS_SUCCESS
}
    from "./UserLoginActionTypes"

const initialState = {
    loading: false,
    credentials: {},
    error: ''
}

const userLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERLOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERLOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                credentials: action.payload,
                error: ''
            }
        case FETCH_USERLOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                credentials: {},
                error: action.payload
            }
        case UPDATE_CREDS_SUCCESS:
            return {
                ...state,
                loading: false,
                credentials: { ...state, ...action.payload },
                error: ''
            }
        default: return state;
    }
}

export default userLoginReducer
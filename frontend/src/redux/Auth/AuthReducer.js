import { ON_USER_SIGNUP }
    from "./AuthActionTypes"

const initialState = {
    message: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_USER_SIGNUP:
            console.log("inside")
            return {
                ...state,
                message: action.payload

            }
        default: return state;
    }
}

export default authReducer
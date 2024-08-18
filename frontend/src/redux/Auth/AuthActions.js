import {
    ON_USER_SIGNUP
} from './AuthActionTypes'

export const SignUpSuccess = message => {
    return {
        type: ON_USER_SIGNUP,
        payload: message
    }
}
import appReducer from "./appReducer"

const rootReducer = (state, action) => {
    if (action.type === 'USER-LOGOUT') {
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}


export const logout = () => {
    return {
        type: 'USER-LOGOUT',
    }

}
export default rootReducer

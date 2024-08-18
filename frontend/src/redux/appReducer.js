import { combineReducers } from 'redux'
import authReducer from './Auth/AuthReducer'
import restLoginReducer from './Restaurant/Login/RestLoginReducer'
import restReducer from './Restaurant/Rest/RestReducer'
import restSignupReducer from './Restaurant/Signup/RestSignupReducer'
import favouriteReducer from './user/Favourite/FavouriteReducer'
import locationReducer from './user/Location/LocationReducer'
import userLoginReducer from './user/Login/UserLoginReducer'
import cartReducer from './user/Cart/CartReducer'
import restGridReducer from './user/RestGrid/RestGridReducer'
import userReducer from './user/User/UserReducer'

const appReducer = combineReducers({
    restGrid: restGridReducer,
    user: userReducer,
    rest: restReducer,
    userCreds: userLoginReducer,
    restCreds: restLoginReducer,
    userLocation: locationReducer,
    favourites: favouriteReducer,
    auth: authReducer,
    restSignupDetails: restSignupReducer,
    cart: cartReducer
})


export default appReducer
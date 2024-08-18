import { FETCH_FAVOURITE_FAILURE, FETCH_FAVOURITE_SUCCESS, FETCH_FAVOURITE_REQUEST, ADD_FAVOURITE_SUCCESS, DEL_FAVOURITE_SUCCESS }
    from "./FavouriteActionTypes"


const initialState = {
    loading: false,
    favourite: [],
    error: ''
}

const favouriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FAVOURITE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_FAVOURITE_SUCCESS:
            return {
                ...state,
                loading: false,
                favourite: action.payload,
                error: ''
            }
        case FETCH_FAVOURITE_FAILURE:
            return {
                ...state,
                loading: false,
                favourite: [],
                error: action.payload
            }
        case ADD_FAVOURITE_SUCCESS:
            return {
                ...state,
                loading: false,
                favourite: [...state.favourite, action.payload],
                error: ''
            }
        case DEL_FAVOURITE_SUCCESS:
            console.log("FAVS", state.favourite)
            console.log("PAYLOAD", action.payload)

            return {
                ...state,
                loading: false,
                favourite: [...state.favourite.filter(i => i != action.payload)],
                error: ''
            }
        default: return state;
    }
}

export default favouriteReducer
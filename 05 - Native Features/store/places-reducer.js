import Places from "../models/Places"
import { ADD_PLACE } from "./places-action"

const initialState = {
    places: []
}


export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Places(new Date().toString(), action.placeData.title)

            return {
                ...state,
                places: state.places.concat(newPlace)
            }
        default:
            return state;
    }
}

import Places from "../models/Places"
import { ADD_PLACE, FETCH_PLACES } from "./places-action"

const initialState = {
    places: []
}


export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Places(
                action.placeData.id.toString(),
                action.placeData.title,
                action.placeData.image,
            );

            return {
                ...state,
                places: state.places.concat(newPlace)
            }

        case FETCH_PLACES:
            return {
                ...state,
                places: action.places.map(place => new Places(
                    place.id.toString(),
                    place.title,
                    place.image,
                    // place.address,
                    // place.lat,
                    // place.lng
                ))
            }

        default:
            return state;
    }
}

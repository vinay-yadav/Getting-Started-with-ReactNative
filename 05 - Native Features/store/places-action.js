import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../helpers/db';


export const ADD_PLACE = "ADD_PLACE";
export const FETCH_PLACES = 'FETCH_PLACES';


export const addPlace = (title, image) => {
    return async dispatch => {
        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });

            const dbResult = await insertPlace(title, image, 'dummy address', 1.112, 6.112);

            dispatch({
                type: ADD_PLACE,
                placeData: {
                    id: dbResult.insertId,
                    title,
                    image
                }
            });

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}



export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();

            dispatch({
                type: FETCH_PLACES,
                places: dbResult.rows['_array']

            })

        } catch (error) {
            throw error;
        }
    }
}

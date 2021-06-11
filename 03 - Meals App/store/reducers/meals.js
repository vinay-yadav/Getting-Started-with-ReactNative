import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favMeals: []
};

const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favMeals.findIndex(meal => meal.id === action.mealId);

            if (existingIndex >= 0) {
                const updateFavMeals = [...state.favMeals];
                updateFavMeals.splice(existingIndex, 1);
                return {
                    ...state,
                    favMeals: updateFavMeals
                }
            } else {
                return {
                    ...state,
                    favMeals: state.favMeals.concat(
                        state.meals.find(meal => meal.id === action.mealId)
                    )
                }
            }

        case SET_FILTERS:
            const appliedFilters = action.filters;
            const filteredMeals = state.meals.filter(meal => {
                if (appliedFilters.gluten && !meal.isGlutenFree)
                    return false;

                if (appliedFilters.lactose && !meal.isLactoseFree)
                    return false;

                if (appliedFilters.vegan && !meal.isVegan)
                    return false;

                if (appliedFilters.vegetarian && !meal.isVegetarian)
                    return false;

                return true;
            })

            return {
                ...state,
                filteredMeals: filteredMeals
            }

        default:
            return state;
    }
}

export default mealsReducer;
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Colors from '../constants/Colors';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMeals';
import MealDetailScreen from '../screens/MealsDetailScreen';

const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: {
        screen: CategoryMealScreen
    },
    MealDetail: MealDetailScreen
}, {
    mode: 'modal',  // Modal only works in ios
    // initialRouteName: 'MealDetail',  // App First Screen
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'ios' ? 'white' : Colors.primary,
        },
        headerTintColor: Platform.OS === 'ios' ? Colors.primary : 'white'
    }
});


export default createAppContainer(MealsNavigator);
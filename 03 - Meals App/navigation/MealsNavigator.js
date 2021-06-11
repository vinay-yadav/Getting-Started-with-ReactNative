import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Colors from '../constants/Colors';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMeals';
import MealDetailScreen from '../screens/MealsDetailScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import FilterScreen from '../screens/FilterScreens';

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
        headerTitleStyle: {
            fontFamily: 'open-sans'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS === 'ios' ? Colors.primary : 'white'
    }
});


const FavNavigator = createStackNavigator(
    {
        Favourites: FavouriteScreen,
        MealDetail: MealDetailScreen
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'ios' ? 'white' : Colors.accent,
            },
            headerTitleStyle: {
                fontFamily: 'open-sans'
            },
            headerBackTitleStyle: {
                fontFamily: 'open-sans'
            },
            headerTintColor: Platform.OS === 'ios' ? Colors.primary : 'white'
        }
    }
);

// Temporary

const FilterNav = createStackNavigator({
    Filter: FilterScreen
}, {
    // navigationOptions: {
    //     drawerLabel: 'Filters!!!'
    // },
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'ios' ? 'white' : Colors.primary,
        },
        headerTintColor: Platform.OS === 'ios' ? Colors.primary : 'white',
    }
});


const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarLabel: 'Meals!',
            tabBarIcon: tabInfo => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primary
        }
    },
    Favourites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarLabel: 'Favourites!!',
            tabBarIcon: tabInfo => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accent
        }
    },
    //  TEMP TAB
    Filters: {
        screen: FilterNav,
        navigationOptions: {
            tabBarLabel: 'Filters!!',
            tabBarIcon: tabInfo => {
                return <Ionicons name="ios-filter" size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primary
        }
    }
};


const MealsFavTabNavigator =
    Platform.OS === 'android'
        ? createMaterialBottomTabNavigator(
            tabScreenConfig,
            {
                activeColor: 'white',
                shifting: true,
                barStyle: {
                    // works only if sihfting is false
                    backgroundColor: 'pink'
                }
            }
        )

        : createBottomTabNavigator(
            tabScreenConfig,
            {
                tabBarOptions: {
                    activeTintColor: Colors.accent
                }
            }
        );

// MealsFavTabNavigator is now our root navigator

// const FilterNav = createStackNavigator({
//     Filter: FilterScreen
// }, {
//     // navigationOptions: {
//     //     drawerLabel: 'Filters!!!'
//     // },
//     defaultNavigationOptions: {
//         headerStyle: {
//             backgroundColor: Platform.OS === 'ios' ? 'white' : Colors.accent,
//         },
//         headerTintColor: Platform.OS === 'ios' ? Colors.primary : 'white'
//     }
// });

// const MainNavigator = createDrawerNavigator(
//     {
//         MealsFav: {
//             screen: MealsFavTabNavigator,
//             navigationOptions: {
//                 drawerLabel: 'Meals'
//             }
//         },
//         Filter: {
//             screen: FilterNav,
//             navigationOptions: {
//                 drawerLabel: 'Filters'
//             }
//         }
//     },
//     {
//         contentOptions: {
//             activeTintColor: Colors.accent,
//             labelStyle: {
//                 fontFamily: 'open-sans-bold',
//                 marginTop: 100
//             }
//         }
//     }
// );

// MainNavigator is now our root navigator

// export default createAppContainer(MainNavigator);

export default createAppContainer(MealsFavTabNavigator);
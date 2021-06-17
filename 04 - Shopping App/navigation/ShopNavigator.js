import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Platform, Button, SafeAreaView, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductsDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import { Ionicons } from '@expo/vector-icons';
import UserProductScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/auth';


const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen,
        ProductView: ProductDetailScreen,
        Cart: CartScreen
    },
    {
        defaultNavigationOptions: defaultNavOptions,
        navigationOptions: {
            drawerIcon: drawerConfig => <Ionicons name={'md-cart'} size={23} color={drawerConfig.tintColor} />
        }
    }
);


const ordersNavigator = createStackNavigator(
    {
        orders: OrderScreen
    },
    {
        defaultNavigationOptions: defaultNavOptions,
        navigationOptions: {
            drawerIcon: drawerConfig => <Ionicons name={'md-list'} size={23} color={drawerConfig.tintColor} />
        }
    }
);


const AdminNavigator = createStackNavigator(
    {
        UserProducts: UserProductScreen,
        EditProduct: EditProductScreen
    },
    {
        defaultNavigationOptions: defaultNavOptions,
        navigationOptions: {
            drawerIcon: drawerConfig => <Ionicons name={'md-create'} size={23} color={drawerConfig.tintColor} />
        }
    }
);


const shopNavigator = createDrawerNavigator(
    {
        Products: ProductNavigator,
        Orders: ordersNavigator,
        Admin: AdminNavigator
    },
    {
        contentOptions: {
            activeTintColor: Colors.primary
        },
        contentComponent: props => {
            const dispatch = useDispatch();

            const logoutHandler = () => {
                dispatch(logout());
                // props.navigation.navigate('Auth');
            }

            return (
                <View style={{ flex: 1, paddingTop: 70 }}>
                    <SafeAreaView forceInset={{ top: 'always', horizonatal: 'never' }}>
                        <DrawerNavigatorItems {...props} />
                        <Button title='Logout' color={Colors.primary} onPress={logoutHandler} />
                    </SafeAreaView>
                </View>
            );
        }
    }
)


const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultNavOptions,
})


const MainNavigator = createSwitchNavigator(
    {
        StartUp: StartupScreen,
        Auth: AuthNavigator,
        Shop: shopNavigator
    }
)


export default createAppContainer(MainNavigator);
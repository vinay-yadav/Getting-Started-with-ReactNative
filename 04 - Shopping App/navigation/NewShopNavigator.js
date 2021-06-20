import React from 'react';
import { Platform, Button, SafeAreaView, View } from 'react-native';
import Colors from '../constants/Colors';
import ProductsOverviewScreen, { screenOptions as productOverviewScreenOptions } from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen, { screenOptions as productDetailsScreenOptions } from '../screens/shop/ProductsDetailScreen';
import CartScreen, { screenOptions as cartScreenOptions } from '../screens/shop/CartScreen';
import OrderScreen, { screenOptions as ordersScreenOptions } from '../screens/shop/OrderScreen';
import { Ionicons } from '@expo/vector-icons';
import UserProductScreen, { screenOptions as userProductsScreenOptions } from '../screens/user/UserProductsScreen';
import EditProductScreen, { screenOptions as editProductsScreenOptions } from '../screens/user/EditProductScreen';
import AuthScreen, { screenOptions as authScreenOptions } from '../screens/user/AuthScreen';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/auth';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';


const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};


const ProductsStackNavigator = createStackNavigator();

export const ProductNavigator = () => (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <ProductsStackNavigator.Screen
            name="ProductsOverview"
            component={ProductsOverviewScreen}
            options={productOverviewScreenOptions}
        />
        <ProductsStackNavigator.Screen
            name="ProductView"
            component={ProductDetailScreen}
            options={productDetailsScreenOptions}
        />
        <ProductsStackNavigator.Screen
            name="Cart"
            component={CartScreen}
            options={cartScreenOptions}
        />
    </ProductsStackNavigator.Navigator>
);


const OrdersStackNavigator = createStackNavigator();

const OrdersNavigator = () => (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <OrdersStackNavigator.Screen name="orders" component={OrderScreen} options={ordersScreenOptions} />
    </OrdersStackNavigator.Navigator>
);


const AdminStackNavigator = createStackNavigator();

const AdminNavigator = () => (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <AdminStackNavigator.Screen
            name="UserProducts"
            component={UserProductScreen}
            options={userProductsScreenOptions}
        />
        <AdminStackNavigator.Screen
            name="EditProduct"
            component={EditProductScreen}
            options={editProductsScreenOptions}
        />
    </AdminStackNavigator.Navigator>
);


const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
    const dispatch = useDispatch();

    return (
        <ShopDrawerNavigator.Navigator
            drawerContent={props => {
                const logoutHandler = () => {
                    dispatch(logout());
                    // props.navigation.navigate('Auth');
                }

                return (
                    <View style={{ flex: 1, paddingTop: 70 }}>
                        <SafeAreaView forceInset={{ top: 'always', horizonatal: 'never' }}>
                            <DrawerItemList {...props} />
                            <Button title='Logout' color={Colors.primary} onPress={logoutHandler} />
                        </SafeAreaView>
                    </View>
                );
            }}
            drawerContentOptions={{
                activeTintColor: Colors.primary
            }
            }
        >
            <ShopDrawerNavigator.Screen
                name="Products"
                component={ProductNavigator}
                options={{
                    drawerIcon: props => <Ionicons name={'md-cart'} size={23} color={props.color} />
                }}
            />
            <ShopDrawerNavigator.Screen
                name="Orders"
                component={OrdersNavigator}
                options={{
                    drawerIcon: props => <Ionicons name={'md-list'} size={23} color={props.color} />
                }}
            />
            <ShopDrawerNavigator.Screen
                name="Admin"
                component={AdminNavigator}
                options={{
                    drawerIcon: props => <Ionicons name={'md-create'} size={23} color={props.color} />
                }}
            />
        </ShopDrawerNavigator.Navigator>
    );
}


const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AuthStackNavigator.Screen name='Auth' component={AuthScreen} options={authScreenOptions} />
        </AuthStackNavigator.Navigator>
    );
}


// const MainNavigator = createSwitchNavigator(
//     {
//         StartUp: StartupScreen,
//         Auth: AuthNavigator,
//         Shop: shopNavigator
//     }
// )


// export default createAppContainer(MainNavigator);
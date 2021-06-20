import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { ShopNavigator, AuthNavigator } from './NewShopNavigator';
import StartupScreen from '../screens/StartupScreen';


const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token);
    const tryLogin = useSelector(state => state.auth.didTryAutoLogin);


    return (
        <NavigationContainer>
            {isAuth && <ShopNavigator />}
            {!isAuth && tryLogin && <AuthNavigator />}
            {!isAuth && !tryLogin && <StartupScreen />}
        </NavigationContainer>
    );
}

export default AppNavigator;
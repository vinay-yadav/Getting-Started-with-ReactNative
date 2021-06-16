import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/orders';
import ShopNavigator from './navigation/ShopNavigator';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setFontLoaded(true)}
                onError={err => console.log('Error in loading fonts: ' + err)}
            />
        );
    }

    return (
        <Provider store={store}>
            <ShopNavigator />
            {/* <StatusBar style="auto" /> */}
        </Provider>
    );
}

import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'
import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductsDetailScreen';
import CartScreen from '../screens/shop/CartScreen';

const ProductNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen,
        ProductView: ProductDetailScreen,
        Cart: CartScreen
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
            },
            headerTitleStyle: {
                fontFamily: 'open-sans-bold',
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
        }
    }
);


export default createAppContainer(ProductNavigator);
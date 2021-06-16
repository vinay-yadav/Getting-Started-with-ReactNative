import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Platform, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import OrderItem from '../../components/shop/OrderItem';
import { fetchOrders } from '../../store/actions/orders';
import Colors from '../../constants/Colors';

const OrderScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const orders = useSelector(state => state.orders.orders);

    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);

        dispatch(fetchOrders())
            .then(resp => setIsLoading(false))
            .catch(error => console.log(error));
            
    }, [dispatch])

    if (isLoading)
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );

    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <OrderItem
                    total={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                />
            )}
        />
    );
}

OrderScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title='Menu'
                        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                        onPress={() => navData.navigation.toggleDrawer()}
                    />
                </HeaderButtons>
            );
        }
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default OrderScreen;
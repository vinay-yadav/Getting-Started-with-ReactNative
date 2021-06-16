import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import { removeItem } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';
import Card from '../../components/UI/Card';

const CartScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const cartItems = useSelector(state => {
        const transformedCartItem = [];
        for (const key in state.cart.items) {
            transformedCartItem.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }

        return transformedCartItem.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);

    const orderNowHandler = () => {
        setIsLoading(true);
        dispatch(
            addOrder(cartItems, cartTotalAmount)
        )
            .then(resp => setIsLoading(false))
            .catch(err => console.log('Cart ', err));
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                <Button
                    color={Colors.accent}
                    title='Order Now'
                    disabled={cartItems.length < 1 ? true : false}
                    onPress={orderNowHandler}
                />
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                    <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        total={itemData.item.sum}
                        deletable
                        onRemove={() => dispatch(removeItem(itemData.item.productId))}
                    />
                )}
            />
        </View>
    );
}

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
}

const styles = StyleSheet.create({
    screen: {
        margin: 20,
        // backgroundColor: 'white'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        // shadowColor: 'black',
        // shadowOpacity: 0.26,
        // shadowOffset: { width: 0, height: 1 },
        // shadowRadius: 8,
        // elevation: 10,
        // borderRadius: 10,
        // backgroundColor: 'white',
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    amount: {
        color: Colors.primary
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default CartScreen;
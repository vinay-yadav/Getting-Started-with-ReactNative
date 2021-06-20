import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import { addToCart } from '../../store/actions/cart';

import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const ProductDetail = props => {
    const productId = props.route.params ? props.route.params.productId : null;
    const selectedProduct = useSelector(
        state => state.products.availableProducts.find(product => product.id === productId)
    )
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <View style={styles.actions}>
                <Button color={Colors.accent} title='Add to cart' onPress={() => dispatch(addToCart(selectedProduct))} />
            </View>
            <Text style={styles.price}>${selectedProduct.price}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
}

export const screenOptions = navData => {
    return {
        headerTitle: navData.route.params.productTitle,
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title='Cart'
                        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                        onPress={() => navData.navigation.navigate('Cart')}
                    />
                </HeaderButtons>
            );
        }
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold',
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    }
});

export default ProductDetail;
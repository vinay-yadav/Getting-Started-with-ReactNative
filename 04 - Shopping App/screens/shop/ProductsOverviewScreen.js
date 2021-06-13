import React from 'react';
import { StyleSheet, FlatList, Platform, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cart';
import HeaderButton from '../../components/UI/HeaderButton';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';


const ProductOverview = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductView', {
            productId: id,
            productTitle: title
        })
    }

    return <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={itemData => (
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title)}
            >
                <Button
                    color={Colors.primary}
                    title='View Details'
                    onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)}
                />
                <Button
                    color={Colors.primary}
                    title='To Cart'
                    onPress={() => dispatch(addToCart(itemData.item))}
                />
            </ProductItem>
        )}
    />
}

ProductOverview.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
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
        },
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

const styles = StyleSheet.create({});

export default ProductOverview;
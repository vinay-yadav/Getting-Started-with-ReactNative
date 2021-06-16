import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Platform, Button, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cart';
import HeaderButton from '../../components/UI/HeaderButton';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';
import { fetchProducts } from '../../store/actions/products';


const ProductOverview = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(false);

    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();


    const loadProducts = useCallback(
        async () => {
            setError(null);
            // setIsLoading(true);
            setIsRefreshing(true);

            try {
                await dispatch(fetchProducts())
            } catch (err) {
                setError(err.message)
            }

            setIsRefreshing(false);
            // setIsLoading(false);
            
        }, [dispatch, setIsLoading, setError]
    );


    useEffect(() => {
        // for re-fetching of data
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts);

        return () => {
            willFocusSub.remove();
        }
    }, [])


    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(resp => setIsLoading(false))
    }, [dispatch, loadProducts])


    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductView', {
            productId: id,
            productTitle: title
        })
    }

    if (isLoading)
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );

    if (!isLoading && products.length === 0)
        return (
            <View style={styles.centered}>
                <Text>Currently no products are available!!!</Text>
            </View>
        );

    if (error)
        return (
            <View style={styles.centered}>
                <Text>Can't connect to the server!!!</Text>
                <Button title='Refresh' onPress={loadProducts} color={Colors.primary} />
            </View>
        );

    return <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
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

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ProductOverview;
import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cart';


const ProductOverview = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    return <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={itemData => (
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onViewDetails={
                    () => props.navigation.navigate('ProductView', {
                        productId: itemData.item.id,
                        productTitle: itemData.item.title
                    })
                }
                onAddToCart={() => dispatch(addToCart(itemData.item))}
            />
        )}
    />
}

ProductOverview.navigationOptions = {
    headerTitle: 'All Products'
}

const styles = StyleSheet.create({});

export default ProductOverview;
import React from 'react';
import { StyleSheet, FlatList, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';

import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';
import { deleteProduct } from '../../store/actions/products';

const UserProductScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = id => {
        props.navigation.navigate('EditProduct', { productId: id })
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={
                itemData =>
                    <ProductItem
                        title={itemData.item.title}
                        price={itemData.item.price}
                        image={itemData.item.imageUrl}
                        onSelect={() => editProductHandler(itemData.item.id)}
                    >
                        <Button
                            color={Colors.primary}
                            title='Edit'
                            onPress={() => editProductHandler(itemData.item.id)}
                        />
                        <Button
                            color={Colors.primary}
                            title='Delete'
                            onPress={() => dispatch(deleteProduct(itemData.item.id))}
                        />
                    </ProductItem>
            }
        />
    );
}


UserProductScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
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
                        title='Add'
                        iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                        onPress={() => navData.navigation.navigate('EditProduct')}
                    />
                </HeaderButtons>
            );
        }
    }
}

const styles = StyleSheet.create({});

export default UserProductScreen;
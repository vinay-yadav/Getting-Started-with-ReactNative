import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform } from 'react-native';
import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct } from '../../store/actions/products';

const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(
        product => product.id === prodId
    ))

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [image, setImage] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const dispatch = useDispatch();

    const submitHandler = useCallback(() => {
        console.log('sumit pressed');
        if (editedProduct) {
            dispatch(updateProduct(prodId, title, description, image));
        } else {
            dispatch(createProduct(title, description, image, +price));
        }

        props.navigation.goBack();
    }, [dispatch, prodId, title, description, image, price]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={styles.input} value={image} onChangeText={text => setImage(text)} />
                </View>
                {
                    editedProduct
                        ? null
                        : (
                            <View style={styles.formControl}>
                                <Text style={styles.label}>Price</Text>
                                <TextInput style={styles.input} value={price} onChangeText={text => setPrice(text)} />
                            </View>
                        )
                }
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={description} onChangeText={text => setDescription(text)} />
                </View>
            </View>
        </ScrollView>
    );
}


EditProductScreen.navigationOptions = navData => {
    const submitFxn = navData.navigation.getParam('submit');
    console.log(submitFxn);

    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title='Save'
                        iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                        onPress={submitFxn}
                    />
                </HeaderButtons>
            );
        }
    }
}


const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default EditProductScreen;
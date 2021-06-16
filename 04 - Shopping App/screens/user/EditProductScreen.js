import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, Platform, Alert, KeyboardAvoidingView, ActivityIndicator, Button
} from 'react-native';
import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct } from '../../store/actions/products';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';


const formReducer = (state, action) => {
    if (action.type === 'UPDATE') {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };

        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }

        let formIsValid = true;
        for (const key in updatedValidities) {
            if (!formIsValid)
                break;

            formIsValid = formIsValid && updatedValidities[key];
        }


        return {
            // ...state,    // commented bcoz all state is updated
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            formIsValid: formIsValid
        }
    }

    return state;
}


const EditProductScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(
        product => product.id === prodId
    ))

    // const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    // const [titleIsValid, setTitleIsValid] = useState(true);

    // const [image, setImage] = useState(editedProduct ? editedProduct.imageUrl : '');
    // const [price, setPrice] = useState('');
    // const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            image: editedProduct ? editedProduct.imageUrl : '',
            price: '',
            description: editedProduct ? editedProduct.description : ''

        },
        inputValidities: {
            title: editedProduct ? true : false,
            image: editedProduct ? true : false,
            price: editedProduct ? true : false,
            description: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false
    });

    useEffect(() => {
        if (error) {
            Alert.alert(
                'An error occured',
                error,
                [
                    {text: 'Okay'}
                ]
            )
        }
    }, [error])

    const submitHandler = useCallback(async () => {
        // submit validation
        if (!formState.formIsValid) {
            Alert.alert(
                'Wrong Input',
                'Please check the errors in the form',
                [{ text: 'Okay' }]
            )
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            if (editedProduct) {
                await dispatch(updateProduct(
                    prodId,
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.image
                ));
            } else {
                await dispatch(createProduct(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.image,
                    +formState.inputValues.price
                ));
            }

            props.navigation.goBack();
        } catch (err) {
            setError(err.message);
        }

        setIsLoading(false);

    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])


    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            // let isValid = false;
            // if (text.trim().length > 0)
            //     isValid = true;

            dispatchFormState({
                type: 'UPDATE',
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        }, [dispatchFormState])

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    // if (error) {
    //     return (
    //         <View style={styles.centered}>
    //             <Text>{error}</Text>
    //         </View>
    //     );
    // }


    return (
        <KeyboardAvoidingView /*style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={100}*/>
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id='title'
                        label={'Title'}
                        value={editedProduct ? editedProduct.title : ''}
                        valid={!!editedProduct}
                        onInputChange={inputChangeHandler}
                        errorText={'Please enter a valid title'}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        required
                    />

                    <Input
                        id='image'
                        label={'Image URL'}
                        value={editedProduct ? editedProduct.imageUrl : ''}
                        valid={!!editedProduct}
                        onInputChange={inputChangeHandler}
                        errorText={'Please enter a valid image url'}
                        keyboardType='default'
                        returnKeyType='next'
                        required
                    />

                    {
                        editedProduct
                            ? null
                            : (
                                <Input
                                    id='price'
                                    label={'Price'}
                                    onInputChange={inputChangeHandler}
                                    errorText={'Please enter a valid price'}
                                    keyboardType='decimal-pad'
                                    returnKeyType='next'
                                    required
                                    min={0.1}
                                />
                            )
                    }

                    <Input
                        id='description'
                        label={'Description'}
                        value={editedProduct ? editedProduct.description : ''}
                        valid={!!editedProduct}
                        onInputChange={inputChangeHandler}
                        errorText={'Please enter a valid description'}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}


EditProductScreen.navigationOptions = navData => {
    const submitFxn = navData.navigation.getParam('submit');

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
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default EditProductScreen;
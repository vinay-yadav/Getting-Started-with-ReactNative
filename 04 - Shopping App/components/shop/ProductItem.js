import React from 'react';
import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';
import Card from '../UI/Card';

const ProductItem = props => {
    const TouchableEffect = TouchableNativeFeedback;

    return (
        // TouchableNativeFeedback not working with CustomComponent
        <TouchableEffect onPress={props.onSelect} useForeground>
            <View style={styles.product}>
                <Image style={styles.image} source={{ uri: props.image }} />
                <View style={styles.textCotainer}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                </View>
                <View style={styles.actions}>
                    {props.children}
                </View>
            </View>
        </TouchableEffect>
    );
}

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20,
        overflow: 'hidden',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    image: {
        width: '100%',
        height: '60%'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    },
    textCotainer: {
        height: '15%',
        alignItems: 'center',
        padding: 10
    }
});

export default ProductItem;
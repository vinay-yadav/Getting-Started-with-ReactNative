import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';

const MealItem = props => {
    return (
        <TouchableNativeFeedback onPress={props.onClick}>
            <View>
                <Text>{props.title}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({});

export default MealItem;
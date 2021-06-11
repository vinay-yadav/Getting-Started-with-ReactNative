import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DefaultText = props => <Text style={styles.text}>{props.children}</Text>

const styles = StyleSheet.create({
    text: {
        fontFamily: 'open-sans-bold'
    }
});

export default DefaultText;
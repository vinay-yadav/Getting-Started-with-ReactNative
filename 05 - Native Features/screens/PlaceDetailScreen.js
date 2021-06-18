import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaceDetailScreen = props => {
    return <View></View>
}


PlaceDetailScreen.navigationOptions = nanvData => {
    return {
        headerTitle: nanvData.navigation.getParam('placeTitle')
    }
}


const styles = StyleSheet.create({});

export default PlaceDetailScreen;
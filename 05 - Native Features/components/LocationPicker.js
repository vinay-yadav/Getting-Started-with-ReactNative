import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapPreview from './MapPreview';

const LocationPicker = props => {
    const [isFetching, setIsFetching] = useState(false);
    const [location, setLocation] = useState();


    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant location permissions to use this app.'
                [{ text: 'Okay' }]
            )
            return false;
        }
        return true;
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        try {
            setIsFetching(true);

            const location = await Location.getCurrentPositionAsync({
                timeOut: 5000
            });

            console.log(location);
            setLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });

        } catch (error) {
            Alert.alert(
                'Could not fetch location!',
                'Please try again later',
                [{ text: 'Okay' }]
            )
        }

        setIsFetching(false);
    }

    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview} location={location}>
                {
                    isFetching
                        ? <ActivityIndicator size='large' color={Colors.primary} />
                        : <Text>No location chosen yet!</Text>
                }
            </MapPreview>
            <Button title='Get user lcoation' color={Colors.primary} onPress={getLocationHandler} />
        </View>
    );
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1
    }
});

export default LocationPicker;
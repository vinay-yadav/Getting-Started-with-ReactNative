import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import { authenticate, didTryAutoAL } from '../store/actions/auth';

const StartupScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');

            if (!userData) {
                dispatch(didTryAutoAL());
                // props.navigation.navigate('Auth');
                return;
            }

            transFormData = JSON.parse(userData);

            const { token, userId, expiresIn } = transFormData;

            const expirationDate = new Date(expiresIn);

            if (expirationDate <= new Date() || !token || !userId) {
                dispatch(didTryAutoAL());
                // props.navigation.navigate('Auth');
                return;
            }


            const expiryTime = expirationDate.getTime() - new Date().getTime();

            // props.navigation.navigate('Shop');
            dispatch(authenticate(token, userId, expiryTime));

        }

        tryLogin();
    }, [dispatch])

    return (
        <View style={styles.startUp}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    );
}

const styles = StyleSheet.create({
    startUp: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;
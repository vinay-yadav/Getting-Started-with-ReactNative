import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import * as Notifications from 'expo-notifications';


// settings for notification to let OS know
Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true
        }
    }
});


export default function App() {
    useEffect(() => {
        const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        const subscription = Notifications.addNotificationReceivedListener(notification => {
            console.log(notification);
        });

        return () => {
            subscription.remove();
            backgroundSubscription.remove();
        }
    }, []);

    const triggerNotificationHandler = () => {
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'My First Local Notification',
                body: 'First Notification'
            },
            trigger: {
                seconds: 5
            },
            // identifier: ''
        });
    }

    return (
        <View style={styles.container}>
            <Button title="Trigger Notification" onPress={triggerNotificationHandler} />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

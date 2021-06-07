import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const goalItem = props => {
    return (
        <TouchableOpacity onPress={props.onDelete}>
            <View style={styles.listItems}>
                <Text>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    listItems: {
        padding: 10,
        backgroundColor: '#ccc',
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 10
    }
});

export default goalItem;
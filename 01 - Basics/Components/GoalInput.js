import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

const goalInput = props => {
    const [enteredGoal, setEnteredGoal] = useState('');

    const goalInputHandler = enteredText => {
        setEnteredGoal(enteredText);
    }

    const addGoalHandler = () => {
        setEnteredGoal('');
        props.press(enteredGoal);
    }

    return (
        <Modal visible={props.show} animationType="slide">
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder={"Course Goal"}
                    style={styles.input}
                    onChangeText={goalInputHandler}
                    value={enteredGoal}
                />
                <View style={styles.buttonsContainer}>
                    <View style={styles.button}>
                        <Button title="Cancel" onPress={props.cancel} color="red" />
                    </View>
                    <View style={styles.button}>
                        <Button title="ADD" onPress={addGoalHandler} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        // flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginVertical: 10
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
        alignItems: 'center'
    },
    button: {
        width: '40%'
    }
});

export default goalInput;
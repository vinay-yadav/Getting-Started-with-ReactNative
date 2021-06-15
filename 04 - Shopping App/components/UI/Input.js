import React, { useEffect, useReducer } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            return {
                ...state,
                value: action.value,
                isValid: action.isValid,
                touched: true
            }

        case 'INPUT_BLUR':
            return {
                ...state,
                touched: true
            }
        default:
            return state;
    }
}

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.value ? props.value : '',
        isValid: props.valid,
        touched: false
    })

    const textChangerHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }

        dispatch({
            type: 'INPUT_CHANGE',
            value: text,
            isValid: isValid
        })
    }

    const { onInputChange, id } = props;

    const lostFocusHandler = () => {
        dispatch({ type: 'INPUT_BLUR' });
    }

    useEffect(() => {
        console.log('useEffect');
        if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange, id]);

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                {...props}
                style={styles.input}
                value={inputState.value}
                onChangeText={textChangerHandler}
                onBlur={lostFocusHandler}
            // onEndEditing={() => console.log('end')}
            // onSubmitEditing={() => console.log('submitEnd')}
            />
            {
                !inputState.isValid && inputState.touched && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>
                            {props.errorText}
                        </Text>
                    </View>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    formControl: {
        width: '100%'
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    errorContainer: {
        marginVertical: 5
    },
    errorText: {
        fontFamily: 'open-sans',
        color: 'red',
        fontSize: 13
    }
});

export default Input;
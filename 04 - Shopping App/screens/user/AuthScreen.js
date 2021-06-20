import React, { useReducer, useCallback, useState, useEffect } from 'react';
import {
    View, StyleSheet, ScrollView, KeyboardAvoidingView, Button, ActivityIndicator, Alert
} from 'react-native';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { logIn, signUp } from '../../store/actions/auth';

const formReducer = (state, action) => {
    if (action.type === 'UPDATE') {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };

        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }

        let formIsValid = true;
        for (const key in updatedValidities) {
            if (!formIsValid)
                break;

            formIsValid = formIsValid && updatedValidities[key];
        }

        return {
            // ...state,    // commented bcoz all state is updated
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            formIsValid: formIsValid
        }
    }

    return state;
}

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''

        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });


    useEffect(() => {
        if (error) {
            Alert.alert(
                'An error occured',
                error,
                [{text: 'Okay'}]
            )
        }
    }, [error])


    const authHandler = async () => {
        let action;
        if (isSignUp)
            action = signUp(formState.inputValues.email, formState.inputValues.password);
        else
            action = logIn(formState.inputValues.email, formState.inputValues.password);

        setIsLoading(true);
        setError(null);

        try {
            await dispatch(action);
            // props.navigation.navigate('Shop');
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    }


    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: 'UPDATE',
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        }, [dispatchFormState])



    // if (isLoading)
    //     return (
    //         <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
    //             <ActivityIndicator size='large' color={Colors.primary} />
    //         </LinearGradient>
    //     );

    return (
        <KeyboardAvoidingView style={styles.screen} behavior='padding' keyboardVerticalOffset={50}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id='email'
                            label='E-mail'
                            keyboardType={'email-address'}
                            required
                            email
                            autoCapitalize="none"
                            errorText={'Please enter a valid email address'}
                            onInputChange={inputChangeHandler}
                            value=''
                        />
                        <Input
                            id='password'
                            label='Password'
                            keyboardType={'default'}
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorText={'Please enter a valid password'}
                            onInputChange={inputChangeHandler}
                            value=''
                        />
                        <View style={styles.buttonContainer}>
                            {
                                isLoading
                                    ? <ActivityIndicator size='small' color={Colors.primary} />
                                    : (
                                        <Button
                                            title={isSignUp ? 'Sign Up' : 'Login'}
                                            color={Colors.primary}
                                            onPress={authHandler}
                                        />
                                    )
                            }

                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title={isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
                                color={Colors.accent}
                                onPress={() => setIsSignUp(current => !current)}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}


export const screenOptions = {
    headerTitle: 'Authentication',
}


const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    authContainer: {
        padding: 20,
        width: '80%',
        maxWidth: 400,
        // height: '50%',
        maxHeight: 500
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 10
    }
});

export default AuthScreen;
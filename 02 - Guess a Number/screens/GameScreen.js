import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, Dimensions } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';


const renderListItem = (value, index, rounds) => (
    <View key={index} style={styles.listItem}>
        <Text>#{rounds}</Text>
        <Text>{value}</Text>
    </View>
);

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    if (randomNumber === exclude)
        return generateRandomBetween(min, max, exclude);
    else
        return randomNumber;
}

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').height);

    useEffect(() => {
        const deviceOrientationHandler = () => setDeviceWidth(Dimensions.get('window').height);

        Dimensions.addEventListener('change', deviceOrientationHandler);

        return () => {
            Dimensions.removeEventListener('change', deviceOrientationHandler);
        }
    })

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > userChoice)) {
            Alert.alert(
                'Don\'t lie!!',
                'You know that this is wrong...',
                [{ text: 'Sorry!', style: 'cancel' }]
            )
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }

        const nextNum = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);

        setCurrentGuess(nextNum);
        // setRounds(currRound => currRound + 1);
        setPastGuesses(currentList => [nextNum, ...currentList]);
    }


    if (deviceWidth < 500) {
        return (
            <View style={styles.screen}>
                <Text>Opponent's Guess</Text>
                <View style={styles.controls}>
                    <MainButton onClick={() => nextGuessHandler('lower')}>
                        <Ionicons name="md-remove" size={24} />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onClick={() => nextGuessHandler('greater')}>
                        <Ionicons name="md-add" size={24} />
                    </MainButton>
                </View>
                <View style={styles.list}>
                    <ScrollView contentContainerStyle={styles.listConatiner}>
                        {pastGuesses.map((num, index) => renderListItem(num, index, pastGuesses.length - index))}
                    </ScrollView>
                </View>
            </View>);
    }


    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                {/* <Button title="Lower" onPress={() => nextGuessHandler('lower')} />
                <Button title="Greater" onPress={() => nextGuessHandler('greater')} /> */}
                <MainButton onClick={() => nextGuessHandler('lower')}>
                    <Ionicons name="md-remove" size={24} />
                </MainButton>
                <MainButton onClick={() => nextGuessHandler('greater')}>
                    <Ionicons name="md-add" size={24} />
                </MainButton>
            </Card>
            <View style={styles.list}>
                <ScrollView contentContainerStyle={styles.listConatiner}>
                    {pastGuesses.map((num, index) => renderListItem(num, index, pastGuesses.length - index))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // marginTop: 20,
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        width: 400,
        maxWidth: '90%'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%'
    },
    list: {
        // width: '80%',
        width: Dimensions.get('window').width > 392 ? '80%' : '100%',
        flex: 1
    },
    listConatiner: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center'
    }
});

export default GameScreen;
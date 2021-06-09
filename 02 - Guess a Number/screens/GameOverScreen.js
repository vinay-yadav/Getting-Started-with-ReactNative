import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions } from 'react-native';
import MainButton from '../components/MainButton';
import Colors from '../constants/Color';

const GameOverScreen = props => (
    <View style={styles.screen}>
        <Text>The Game is OVER</Text>
        <View style={styles.imageContainer}>
            <Image
                source={require('../assets/success.png')}
                // source={{uri: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmymodernmet.com%2Fwp%2Fwp-content%2Fuploads%2F2021%2F04%2FNature-Sounds-For-Well-Being-03.jpg&imgrefurl=https%3A%2F%2Fmymodernmet.com%2Fnature-sounds-health-study%2F&tbnid=YIyf4clp0GvnbM&vet=12ahUKEwjV3qXv9IjxAhVBeCsKHUVZCUQQMygPegUIARDwAQ..i&docid=1PkX5r5iCel1lM&w=750&h=500&q=nature&ved=2ahUKEwjV3qXv9IjxAhVBeCsKHUVZCUQQMygPegUIARDwAQ'}}
                style={styles.image}
                resizeMode='cover'
            />
        </View>
        <Text style={{ marginBottom: 10 }}>
            Your phone needed
            <Text style={{ color: Colors.primary, fontWeight: 'bold' }}> {props.rounds} </Text>
            rounds to guess the number
            <Text style={{ color: Colors.primary, fontWeight: 'bold' }}> {props.userNumber} </Text>
        </Text>
        {/* <Button title="New Game" onPress={props.newGame} /> */}
        <MainButton onClick={props.newGame}>NEW GAME</MainButton>
    </View>
);

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        // borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        // width: 300,
        // height: 300,
        overflow: 'hidden',
        // marginVertical: 30
        marginVertical: Dimensions.get('window').height / 30
    }
});

export default GameOverScreen;
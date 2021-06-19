import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import { addPlace } from '../store/places-action';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = props => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState();

    const titleChangeHandler = text => {
        setTitle(text);
    }

    const imageTakenHandler = filePath => {
        setImage(filePath);
    }

    const dispatch = useDispatch();

    const savePlaceHandler = () => {
        dispatch(addPlace(title, image));
        props.navigation.goBack();
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    value={title}
                    onChangeText={titleChangeHandler}
                />
                <ImagePicker onImageTaken={imageTakenHandler} />
                <LocationPicker />
                <Button title='Save Place' color={Colors.primary} onPress={savePlaceHandler} />
            </View>
        </ScrollView>
    )
}


NewPlaceScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Add Place'
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15,
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 2,
        paddingVertical: 4
    }
});

export default NewPlaceScreen;
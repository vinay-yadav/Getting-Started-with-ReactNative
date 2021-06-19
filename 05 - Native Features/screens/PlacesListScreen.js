import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';
import { loadPlaces } from '../store/places-action';

const PlacesListScreen = props => {
    const places = useSelector(state => state.places.places)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadPlaces());
    }, [dispatch]);

    return (
        <FlatList
            data={places}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <PlaceItem
                    image={itemData.item.image}
                    title={itemData.item.title}
                    address={null}
                    onSelect={() => props.navigation.navigate(
                        'PlaceDetail',
                        {
                            placeTitle: itemData.item.title,
                            placeId: itemData.item.id,
                        }
                    )}
                />
            )}
        />
    );
}


PlacesListScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Places',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Add Place'
                    iconName='md-add'
                    onPress={() => navData.navigation.navigate('NewPlace')}
                />
            </HeaderButtons>
        )
    }
}


const styles = StyleSheet.create({});

export default PlacesListScreen;
import React from 'react';
import MealList from '../components/MealList';
import { MEALS } from '../data/dummy-data';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import DefaultText from '../components/DefaultText';

const FavouriteScreen = props => {
    const favMeals = useSelector(state => state.meals.favMeals);

    if (favMeals.length < 1 || !favMeals) {
        return (
            <View style={styles.noContent}>
                <DefaultText>
                    NO Favorite Meals Found. Start adding some!!!
                </DefaultText>
            </View>
        );
    }

    return <MealList listData={favMeals} navigation={props.navigation} />
}

FavouriteScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Favourites',
        // headerLeft: () => {
        //     return (
        //         <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        //             <Item
        //                 title="menu"
        //                 iconName="ios-menu"
        //                 onPress={() => navData.navigation.toggleDrawer()}
        //             />
        //         </HeaderButtons>
        //     );
        // }
    }
}

const styles = StyleSheet.create({
    noContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default FavouriteScreen;
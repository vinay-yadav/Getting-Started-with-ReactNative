import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/actions/meals';


const ListItem = props => (
    <View style={styles.listItem}>
        <DefaultText>{props.children}</DefaultText>
    </View>
);

const MealDetailScreen = props => {
    const mealId = props.navigation.getParam('mealId');

    const availavleMeals = useSelector(state => state.meals.meals);

    const isFavoriteMeal = useSelector(state =>
        state.meals.favMeals.some(meal => meal.id === mealId)
    );


    const selectedMeal = availavleMeals.find(meal => meal.id === mealId);

    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(
        () => {
            dispatch(toggleFavorite(mealId));
        },
        [dispatch, mealId]
    );

    useEffect(() => {
        // props.navigation.setParams({mealTitle: selectedMeal.title});
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
    }, [toggleFavoriteHandler])

    useEffect(() => {
        props.navigation.setParams({isFav: isFavoriteMeal});
    }, [isFavoriteMeal])

    return (
        <ScrollView>
            <Image source={{ uri: selectedMeal.imgUrl }} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map((ing, index) => <ListItem key={index}>{ing}</ListItem>)}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map((step, index) => <ListItem key={index}>{index + 1}. {step}</ListItem>)}
        </ScrollView>
    );
}

MealDetailScreen.navigationOptions = navigationData => {
    const isFav = navigationData.navigation.getParam('isFav');

    return {
        headerTitle: navigationData.navigation.getParam('mealTitle'),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Favorite"
                    iconName={isFav ? "ios-star" : "ios-star-outline"}
                    onPress={navigationData.navigation.getParam('toggleFav')}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    image: {
        width: '100%',
        height: 200
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
});

export default MealDetailScreen;
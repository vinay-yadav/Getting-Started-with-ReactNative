import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import MealItem from './MealItem';

const MealList = props => {
    const favoriteMeals = useSelector(state => state.meals.favMeals);

    const renderMealItem = itemData => {
        const isFav = favoriteMeals.some(meal => meal.id === itemData.item.id);

        return (
            <MealItem
                title={itemData.item.title}
                onClick={
                    () => props.navigation.navigate(
                        'MealDetail',
                        {
                            mealId: itemData.item.id,
                            mealTitle: itemData.item.title,
                            isFav: isFav
                        }
                    )
                }
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                image={itemData.item.imgUrl}
            />
        );
    }

    return (
        <View style={styles.list}>
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={props.listData}
                renderItem={renderMealItem}
                style={{ width: '100%' }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    }
});

export default MealList;
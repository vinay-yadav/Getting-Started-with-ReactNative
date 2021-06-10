import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MealItem from '../components/MealItem';
import { CATEGORIES, MEALS } from '../data/dummy-data';

const CategoryMealScreen = props => {
    const renderMealItem = itemData => {
        return (
            <MealItem 
                title={itemData.item.title}
                onCLick={() => props.navigation.navigate('MealDetail')}
            />
        );
    }

    const catId = props.navigation.getParam('categoryId');
    const displayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(catId) !== -1);
    console.log(displayedMeals.length);

    return (
        <View style={styles.screen}>
            <FlatList 
                keyExtractor={(item, index) => item.id}
                data={displayedMeals}
                renderItem={renderMealItem}
            />
        </View>
    );
}

CategoryMealScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(category => category.id === catId);

    return {
        headerTitle: selectedCategory.title,
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoryMealScreen;
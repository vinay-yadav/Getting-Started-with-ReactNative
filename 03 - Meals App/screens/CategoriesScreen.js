import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile';
import { CATEGORIES } from '../data/dummy-data';

const CategoriesScreen = props => {
    const renderGridItem = itemData => {
        return (
            <CategoryGridTile
                color={itemData.item.color}
                title={itemData.item.title}
                click={() => props.navigation.navigate('CategoryMeals', { categoryId: itemData.item.id })}
            />
        );
    }

    return (
        <FlatList
            data={CATEGORIES}
            keyExtractor={(item, index) => item.id}
            numColumns={2}
            renderItem={renderGridItem}
        />
    );
}

CategoriesScreen.navigationOptions = {
    headerTitle: 'Meal Categories'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default CategoriesScreen;
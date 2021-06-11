import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CategoryGridTile from '../components/CategoryGridTile';
import { CATEGORIES } from '../data/dummy-data';
import CustomHeaderButton from '../components/HeaderButton';

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

CategoriesScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Meal Categories',
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
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default CategoriesScreen;
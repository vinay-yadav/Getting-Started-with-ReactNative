import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                onValueChange={props.onChange}
                value={props.value}
            />
        </View>
    );
}

const FilterScreen = props => {
    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const saveFilters = useCallback(
        () => {
            const appliedFilters = {
                gluten: isGlutenFree,
                lactose: isLactoseFree,
                vegan: isVegan,
                vegetarian: isVegetarian
            };

            console.log(appliedFilters);
        },
        [isGlutenFree, isLactoseFree, isVegetarian, isVegan]
    )

    useEffect(() => {
        navigation.setParams({ filters: saveFilters });
    }, [saveFilters])

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch
                label='Gluten Free'
                onChange={newValue => setIsGlutenFree(newValue)}
                value={isGlutenFree}
            />
            <FilterSwitch
                label='Lactose Free'
                onChange={newValue => setIsLactoseFree(newValue)}
                value={isLactoseFree}
            />
            <FilterSwitch
                label='Vegan'
                onChange={newValue => setIsVegan(newValue)}
                value={isVegan}
            />
            <FilterSwitch
                label='Vegetarian'
                onChange={newValue => setIsVegetarian(newValue)}
                value={isVegetarian}
            />
        </View>
    );
}

FilterScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="menu"
                        iconName="ios-menu"
                        onPress={() => navData.navigation.toggleDrawer()}
                    />
                </HeaderButtons>
            );
        },
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Save"
                        iconName="ios-save"
                        onPress={navData.navigation.getParam('filters')}
                    />
                </HeaderButtons>
            );
        }
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        width: '80%',
        marginVertical: 10
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    }
});

export default FilterScreen;
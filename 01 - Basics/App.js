import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import GoalItem from './Components/GoalItem';
import GoalInput from './Components/GoalInput';

export default function App() {
    const [goals, setGoals] = useState([]);
    const [modalState, setModalState] = useState(false);

    const addGoalHandler = enteredGoal => {
        if (enteredGoal !== '') {
            setGoals(currentGoals => [...currentGoals, { id: Math.random().toString(), value: enteredGoal }]);
            setModalState(false);
        }
    }

    const removeGoalHandler = goalId => {
        setGoals(currentGoals => currentGoals.filter(goal => goal.id !== goalId));
    }

    return (
        <View style={styles.screen}>
            <Button
                style={styles.button}
                title="Add New Goal"
                onPress={() => setModalState(true)}
            />
            <GoalInput
                show={modalState}
                press={addGoalHandler}
                cancel={() => setModalState(false)}
            />
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={goals}
                renderItem={itemData => (
                    <GoalItem title={itemData.item.value} onDelete={() => removeGoalHandler(itemData.item.id)} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { padding: 40, marginTop: 20 },
    button: { marginTop: 20 }
});

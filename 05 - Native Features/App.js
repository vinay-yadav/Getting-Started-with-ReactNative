import React from 'react';
import { StyleSheet } from 'react-native';
import PlacesNavigator from './navigations/PlacesNavigator';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import placeReducer from './store/places-reducer';

import { init } from './helpers/db';

init()
	.then(() => console.log('database initialised'))
	.catch(error => {
		console.log('database initialisation failed')
		console.log(error)
	});

const rootReducer = combineReducers({
	places: placeReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
	return (
		<Provider store={store}>
			<PlacesNavigator />
		</Provider>
	);
}

const styles = StyleSheet.create({});

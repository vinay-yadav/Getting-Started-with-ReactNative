/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import type {Node} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import ImagePicker from 'react-native-image-picker';


const App = () => {
  const imagePick = () => {

  }

  return (
    <View style={styles.screen}>
      <Button title='Take Image' onPress={imagePick} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;

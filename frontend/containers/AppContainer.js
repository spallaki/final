import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import Login from '../components/Login.js';
import Calendar from '../components/Calendar.js';
import Register from '../components/Register.js';
import Med from '../components/Med.js';
import Settings from '../components/Settings.js';
import PillCard from '../components/PillCard.js';
import BackHeader from '../components/BackHeader.js';
// import Sidebar from '../components/Sidebar.js';
import TestFile from '../components/testFile.js';

const AppContainer = ({  }) => {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App = StackNavigator({
  Login: {screen: Login},
  TestFile: {screen: TestFile},
  Register: {screen: Register},
  Calendar: {screen: Calendar},
  Med: {screen: Med},
  Settings: {screen: Settings},
  PillCard: {screen: PillCard},
  BackHeader: {screen: BackHeader},
});

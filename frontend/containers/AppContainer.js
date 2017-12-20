import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { StackNavigator } from 'react-navigation';
// import { connect } from 'react-redux';
import Calendar from '../components/Calendar.js';
import Sidebar from '../components/Sidebar.js';
import Settings from '../components/Settings.js';
import Login from '../components/Login.js';

// const AppContainer = ({ }) => {
//   return (
//     <View
//       style={styles.container}
//       >
//       <Calendar />
//     </View>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     name: state.name
//   };
// };
//
// const mapDispatchToProps = (/* dispatch */) => {
//   return {
//   };
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App = StackNavigator({
  Calendar: {screen: Calendar},
  Settings: {screen: Settings}
});

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(AppContainer);

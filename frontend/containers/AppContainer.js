import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
// import PillList from '../components/pillList.js';
import TestFile from '../components/testFile.js';

// import App from '../components/App';

const AppContainer = ({ name }) => {
  console.log(TestFile);
  return (
    <View style={styles.container}>
      <TestFile />
    </View>
  );
};

// {/* <App name={name} /> */}
// {/* <Text>{name} Sup</Text> */}
const mapStateToProps = (state) => {
  return {
    // name: state.name
  };
};

const mapDispatchToProps = (/* dispatch */) => {
  return {
  };
};

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);

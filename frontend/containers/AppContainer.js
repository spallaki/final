import React from 'react';
import {View, Text} from 'react-native';
import { connect } from 'react-redux';
// import App from '../components/App';

const AppContainer = ({ name }) => {
  return (
    <View>
      {/* <App name={name} /> */}
      <Text>{name} Sup</Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    name: state.name
  };
};

const mapDispatchToProps = (/* dispatch */) => {
  return {
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);

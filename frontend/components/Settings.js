import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileImage from './ProfileImage';
import { Header } from 'react-native-elements';
import RXHeader from '../components/RXHeader.js';
import { Drawer } from 'native-base';
import SideBar from './Sidebar';

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    header: null
  }

  closeDrawer = () => {
    this.drawer._root.close()
  };

  openDrawer = () => {
    this.drawer._root.open()
  };




  render() {
    return (
      <View style={{flex: 1}}>
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<SideBar style={{flex: 1, height: 1000}}
            navigation={this.props.navigation}
          />}
          onClose={() => this.closeDrawer()} >
        <RXHeader openDrawer={this.openDrawer} />
        <ProfileImage />
        </Drawer>
      </View>
    )
  }
}

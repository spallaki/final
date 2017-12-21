import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, TextInput } from 'react-native';
// import ProfileImage from './ProfileImage';
import { Header } from 'react-native-elements';
import RXHeader from '../components/RXHeader.js';
import { Drawer } from 'native-base';
import Sidebar from './Sidebar';
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

export default class Walgreens extends React.Component {
  static navigationOptions = {
    title: 'Walgreens',
    header: null
  }
  constructor(props) {
    super(props);

    this.state = {

    }
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
        <View style={styles.inside_cont}>
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<Sidebar style={{flex: 1, height: 1000}}
            navigation={this.props.navigation}
          />}
          onClose={() => this.closeDrawer()} >
        <RXHeader openDrawer={this.openDrawer} />
        <Text style={{fontSize: 34, color: '#4CC5F8', fontFamily: 'HelveticaNeue-Light', paddingTop: 10, alignSelf: 'center'}}>Refill with Walgreens</Text>
        <TextInput style={{
          fontFamily: 'HelveticaNeue-Light',
          backgroundColor: 'transparent',
          height: 30,
          borderBottomWidth: 0.5,
          borderBottomColor: 'white',
          width: PAGE_WIDTH / 2,
          fontSize: 16,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 100,
          marginTop: 50
        }}
          placeholderTextColor="#4CC5F8"
          placeholder="Enter your Rx number"
        >

        </TextInput>
      </Drawer>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inside_cont: {
    backgroundColor: '#F0F1F1',
    height: PAGE_HEIGHT,
    width: PAGE_WIDTH,
    position: 'absolute'
  }
});

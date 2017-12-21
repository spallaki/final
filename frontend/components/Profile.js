import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, TextInput, Image, ScrollView } from 'react-native';
// import ProfileImage from './ProfileImage';
import { Header } from 'react-native-elements';
import RXHeader from '../components/RXHeader.js';
import { Drawer } from 'native-base';
import Sidebar from './Sidebar';
import ProfileImage from './ProfileImage';
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    header: null
  }
  constructor(props) {
    super(props);

    this.state = {
      image: ''
    }
  }

  componentDidMount() {
    fetch('https://agile-forest-10594.herokuapp.com/getProfile',{
      method: 'POST',
    })
    .then((response) => {
      console.log(response);
      return response.json()
    })
    .then((responseJson) => {
      if (responseJson.success) {
        this.setState({image: responseJson.result[0].profile_pic})
      } else {
        console.log('Error finding picture', responseJson.error);
      }
    })
    .catch((err) => {
      console.log('Found no picture');
      alert(err)
    })
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
          content={<Sidebar style={{flex: 1, height: 1000}} navigation={this.props.navigation} />}
          onClose={() => this.closeDrawer()} >
        <RXHeader currentScreen={'Settings'} openDrawer={this.openDrawer} />
        <Text style={{fontSize: 34, color: 'white', fontFamily: 'HelveticaNeue-Light', paddingTop: 10, alignSelf: 'center'}}>Profile Image</Text>
        <ProfileImage navigation={this.props.navigation} />
      </Drawer>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inside_cont: {
    backgroundColor: '#C6E2FF',
    height: PAGE_HEIGHT,
    width: PAGE_WIDTH,
    position: 'absolute'
  },
  profilepic: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    borderColor: 'white',
    backgroundColor: 'white',
    marginLeft: 135,
    marginTop: 30
  }
});

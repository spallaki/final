import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, TextInput, Image } from 'react-native';
// import ProfileImage from './ProfileImage';
import { Header } from 'react-native-elements';
import RXHeader from '../components/RXHeader.js';
import { Drawer } from 'native-base';
import Sidebar from './Sidebar';
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;
export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      username: '',
      password: '',
      lastName: '',
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
          {/* <RXHeader /> */}
          <Drawer
            ref={(ref) => { this.drawer = ref; }}
            content={<Sidebar style={{flex: 1, height: 1000}}
              navigation={this.props.navigation}
            />}
            onClose={() => this.closeDrawer()} >
            <RXHeader currentScreen={'Settings'} openDrawer={this.openDrawer} />
            {/* <ProfileImage /> */}
            <Text style={{fontSize: 34, color: 'white', fontFamily: 'HelveticaNeue-Light', paddingTop: 10, alignSelf: 'center'}}>Account</Text>
            <View style={{flex: 1}}>
              <Image
                source={{ uri: this.state.image }}
                style={{height: 75, width: 75, marginTop: 30, borderRadius: 10, alignSelf: 'center'}}
              />

            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', bottom: 200}}>
              <TextInput
                style={{fontFamily: 'HelveticaNeue-Light',
                top: -100,
                flex: 0,
                backgroundColor: 'transparent',
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: 0.5,
                borderBottomColor: 'white',
                width: PAGE_WIDTH / 2,
                fontSize: 16,}}
                placeholderTextColor="white"
                placeholder="First Name"
                onChangeText={(text) => this.setState({firstName: text})}
              /><TextInput
                style={{fontFamily: 'HelveticaNeue-Light',
                top: -90,
                flex: 0,
                backgroundColor: 'transparent',
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: 0.5,
                borderBottomColor: 'white',
                width: PAGE_WIDTH / 2,
                fontSize: 16,}}
                placeholderTextColor="white"
                placeholder="Last Name"
                onChangeText={(text) => this.setState({lastName: text})}
              />
              <TextInput
                style={{fontFamily: 'HelveticaNeue-Light',
                top: -80,
                flex: 0,
                backgroundColor: 'transparent',
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: 0.5,
                borderBottomColor: 'white',
                width: PAGE_WIDTH / 2,
                fontSize: 16,}}
                placeholderTextColor="white"
                placeholder="Username"
                onChangeText={(text) => this.setState({username: text})}
              />
              <TextInput
                style={{fontFamily: 'HelveticaNeue-Light',
                top: -70,
                flex: 0,
                backgroundColor: 'transparent',
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: 0.5,
                borderBottomColor: 'white',
                width: PAGE_WIDTH / 2,
                fontSize: 16,}}
                placeholderTextColor="white"
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => this.setState({password: text})}
              />
            </View>
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

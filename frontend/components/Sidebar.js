import React, { Component } from 'react';
import { Button, StyleSheet, View, Image, AsyncStorage } from 'react-native';
import ProfileImage from './ProfileImage';
import { DOMAIN } from '../../env.js';

export default class Sidebar extends React.Component {
  static navigationOptions = {
    title: 'Sidebar',
    header: null,
  }
  constructor(props) {
    super(props);
      this.state = {
        // image: null
        image: ''
      };
  }

// logout function
logout = () => {
  fetch('https://agile-forest-10594.herokuapp.com/logout', {
    method: 'GET',
    }
  ).then((response) => {
    return response.json()
  })
  .then( async (responseJson) => {
    if(responseJson.success){
      try {
        let logoutAwait = await AsyncStorage.removeItem('user')
      } catch (e) {
        console.log('Some error loging out: ', e);
      }
        return this.props.navigation.navigate('Login');
  } else {
    alert(responseJson.error)
    console.log('Error signing out', responseJson.error);
  }
  })
  .catch((err) => {
    console.log('Another error signing out');
    alert(err)
  });
}

componentDidMount() {
  fetch(`${DOMAIN}/addProfile`,{
    method: 'GET',
  })
  .then((response) => {
    return response.json()
  })
  .then((responseJson) => {
    if (responseJson.success) {
      this.setState({image: responseJson.photo})
    } else {
      console.log('Error finding picture', responseJson.error);
    }
  })
  .catch((err) => {
    console.log('Found no picture');
    alert(err)
  })
}

calendar() {
  this.props.navigation.navigate('Calendar')
}

settings() {
  this.props.navigation.navigate('Settings')
}


  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
        <Image
          // source={{uri: 'data:image/jpeg;base64,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'}}
          source={{ uri: this.state.image}}
          style={{height: 75, width: 75, marginTop: 30, borderRadius: 10}}
        />
        {/* <ProfileImage /> */}
        <Button title='Profile' color="#00adf5"/>
        <Button onPress={ () => {this.settings()} } title='Settings' color="#00adf5"/>
        <Button onPress={ () => {this.calendar()} } title='Calendar' color="#00adf5"/>
        <Button title='All Prescriptions' color="#00adf5"/>
        <Button title='Request Refill' color="#00adf5"/>
        <Button onPress={ () => this.logout() } title='Logout' color="#F0BC0F" />
      </View>
    );
  }
}


//THINGS TO DO
// 1. fix calander navigation route
// 2. figure out user picture
// 3. logout

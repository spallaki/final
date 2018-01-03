import React, { Component } from 'react';
import { Button, StyleSheet, View, Image, AsyncStorage } from 'react-native';
// import ProfileImage from './ProfileImage';

export default class Sidebar extends React.Component {
  static navigationOptions = {
    title: 'Sidebar',
    header: null,
  }
  constructor(props) {
    super(props);
      this.state = {
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
        // console.log('Some error loging out: ', e);
      }
        return this.props.navigation.navigate('Login');
  } else {
    alert(responseJson.error)
    // console.log('Error signing out', responseJson.error);
  }
  })
  .catch((err) => {
    // console.log('Another error signing out');
    alert(err)
  });
}

componentDidMount() {
  fetch('https://agile-forest-10594.herokuapp.com/getProfile',{
    method: 'POST',
  })
  .then((response) => {
    // console.log(response);
    return response.json()
  })
  .then((responseJson) => {
    if (responseJson.success && responseJson.result[0].profile_pic) {
      console.log('pro pic in sidebar', responseJson.result[0].profile_pic);
      this.setState({image: responseJson.result[0].profile_pic})
    } else {
      // console.log('Error finding picture', responseJson.error);
    }
  })
  .catch((err) => {
    // console.log('Found no picture');
    alert(err)
  })
}

calendar() {
  this.props.navigation.navigate('Calendar')
}

settings() {
  this.props.navigation.navigate('Settings')
}

// profile() {
//   this.props.navigation.navigate('Profile')
// }


  render() {
    console.log('this.state.image in sidebar', this.state.image);
    return (
      <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
        <Image
          source={require ('../../profile.jpg')}
          style={{height: 75, width: 75, marginTop: 30, borderRadius: 10}}
        />
        <Button onPress={ () => {this.calendar()} } title='Calendar' color="#00adf5"/>
        <Button onPress={ () => this.props.navigation.navigate('PillCard')} title='All Prescriptions' color="#00adf5"/>
        <Button onPress={ () => {this.settings()} } title='Settings' color="#00adf5"/>
        {/* <Button onPress={ () => {this.profile()} } title='Profile' color="#00adf5"/> */}
        {/* <Button title='Request Refill' color="#00adf5"/> */}
        <Button onPress={ () => this.logout() } title='Logout' color="#F0BC0F" />
      </View>
    );
  }
}

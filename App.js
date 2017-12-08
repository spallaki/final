import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Root from './frontend/containers/Root';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rxNumber: '',
    }
  }
 static navigationOptions = {
   title: 'Login'
 };

 postRefill(){
    return fetch('https://services-qa.walgreens.com/api/util/mweb5url', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
    "apiKey": '5bn3H6pt7KR9fOV4MTRE4GczuK11oXaC',
    "affId": 'rxapi',
    "transaction": "refillByScan",
    "act": "mweb5Url",
    "view": "mweb5UrlJSON"
})
  })
  .then((response) => response.json())
  .then((responseJson) => {
    if(responseJson.success === true){
      AsyncStorage.setItem('user', JSON.stringify(
        {username: this.state.username,
        password: this.state.password}))
      this.props.navigation.navigate('Users')
    } else {
      this.setState({message: 'invalid login'})
    }
  })
  .catch((err) => {
    console.log('Error')
  });
  }

 render() {
   return (
     <View>
       <TextInput
         placeholder = "Prescription Number"
         onChangeText={(text) => this.setState({rxNumber: text})} />

       <TouchableOpacity onPress={ () => {this.postRefill()} }>
         <Text>Submit</Text>
       </TouchableOpacity>
     </View>
   )
 }
}

export default Root;

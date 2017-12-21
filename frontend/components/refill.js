import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Right } from 'native-base';
import { Icon, SearchBar } from 'react-native-elements';
//
// postRefill(){
//    return fetch('https://services-qa.walgreens.com/api/util/mweb5url', {
//    method: 'POST',
//    headers: {
//      "Content-Type": "application/json"
//    },
//    body: JSON.stringify({
//    "apiKey": '5bn3H6pt7KR9fOV4MTRE4GczuK11oXaC',
//    "affId": 'rxapi',
//    "transaction": "refillByScan",
//    "act": "mweb5Url",
//    "view": "mweb5UrlJSON"
// })
//  })
//  .then((response) => response.json())
//  .then((responseJson) => {
//    if(responseJson.success === true){
//      AsyncStorage.setItem('user', JSON.stringify(
//        {username: this.state.username,
//        password: this.state.password}))
//      this.props.navigation.navigate('Users')
//    } else {
//      this.setState({message: 'invalid login'})
//    }
//  })
//  .catch((err) => {
//    console.log('Error')
//  });
//  }
//
//
//  sendLocation = async(user) => {
//      let { status } = await Permissions.askAsync(Permissions.LOCATION);
//  if (status !== 'granted') {
//  console.log('send location async failed')
//  }
//  let location = await Location.getCurrentPositionAsync(
//    {enableHighAccuracy: true});
//  console.log(location)
//  console.log('this is send location')
//  this.longTouchUser(user, location.coords.latitude, location.coords.longitude);
//    }

export default class PillList extends Component {
  constructor(props) {
  super(props);
  this.state = {
    rxNumber: '',
    lat: '',
    long:''
  };
}
render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Rx Number</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Address</Label>
              <Input />
            </Item>
            <TouchableOpacity
              // onPress={this.sendLocation.bind(this, rowData)}
            </TouchableOpacity>
          </Form>
        </Content>
      </Container>
    );
  }
}

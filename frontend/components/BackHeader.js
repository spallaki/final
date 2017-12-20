import React, { Component } from 'react';
import { Container, Header, Text, Button, Left, Right, Body, Icon } from 'native-base';
// import { Drawer } from 'native-base';
import SideBar from './Sidebar';
import { Dimensions } from 'react-native';
// import PillCard from './PillCard';

export default class BackHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      title: ''
      // sideBarOpen: false
    };
  }

  backToMain() {
    console.log(this.props);
    this.props.navigation.navigate('PillCard');
  }

  render() {
    return (
        <Header style={{ backgroundColor: '#F0BC0F', width: Dimensions.get('window').width, bottom: 100}}>
          <Left>
            <Button transparent>
              <Icon name='arrow-round-back' style={{ color: 'white' }}
                onPress={() => {this.backToMain()}}
              />
            </Button>
          </Left>
          <Body>
            <Text style={{ color: 'white' }}>
              {this.props.currentScreen}
            </Text>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='add' style={{ color: 'white' }} />
            </Button>
          </Right>
        </Header>
    );
  }
}

import React, { Component } from 'react';
import { Container, Header, Text, Button, Left, Right, Body, Icon } from 'native-base';
import { Drawer } from 'native-base';
import SideBar from './Sidebar';
import { Dimensions } from 'react-native';

export default class RXHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      title: ''
      // sideBarOpen: false
    };
  }

  render() {
    return (
        <Header style={{ backgroundColor: '#F0BC0F', width: Dimensions.get('window').width, bottom: 100}}>
          <Left>
            <Button transparent>
              <Icon name='menu' style={{ color: 'white' }}
                onPress={() => {this.props.openDrawer()}}
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

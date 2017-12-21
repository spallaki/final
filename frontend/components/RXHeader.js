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

  // componentWillMount() {
  //   this.setState({title})
  // }

  render() {
    // var leftButton = <Left> </Left>
    // if(this.props.currentScreen === 'something') {
    //   leftButton = <lef
    // } else if(this.props.currentScreen === 'something else'){
    //
    // }
    return (
      // <Container>
        <Header style={{ backgroundColor: '#F0BC0F', width: Dimensions.get('window').width, bottom: 100}}>

          {/* {this.props.currentScreen === 'Homepage' ? } */}
          <Left>
            <Button transparent>
              <Icon name='menu' style={{ color: 'white' }}
                onPress={() => {this.props.openDrawer()}}
              />
            </Button>
          </Left>
          <Body>
            <Text style={{ color: 'white' }}>
              RX Tracker

            </Text>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='add' style={{ color: 'white' }} />
            </Button>
          </Right>
        </Header>
        // </Container>
    );
  }
}

import React, { Component } from 'react';
import { Container, Header, Text, Button, Left, Right, Body, Icon, View, Content, Form, Item, Input, Label } from 'native-base';
import { Drawer } from 'native-base';
import SideBar from './Sidebar';
import Modal from 'react-native-modal'
import { Image, TextInput, PAGE_WIDTH } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

export default class RXHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      sideBarOpen: false,
      isModalVisible: false,
      text: ''
    };
  }
  componentWillMount(){
    this.setState({modalImage: require('../assets/logo.jpg')})
  }
  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })

  render() {
    return (
      <Header style={{ backgroundColor: '#F0BC0F' }}>
        <Left>
          <Button transparent>
            <Icon name='menu' style={{ color: 'white' }} onPress={() => {this.props.openDrawer()}}/>
          </Button>
        </Left>
        <Body>
          <Text style={{ color: 'white' }}>RX Tracker</Text>
        </Body>
        <Right>
          <Button transparent>
            <View>

              <Icon name='add' style={{ color: 'white' }} onPress={this._showModal} />
              <Modal isVisible={this.state.isModalVisible}>

                <View style={{ flex: 1 }}>
                  <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 450,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    fontFamily: 'HelveticaNeue-Light'}}>
                    {/* {this.state.modalImage} */}
                    <Image
                      style={{
                        backgroundColor: 'transparent',
                        resizeMode: 'cover',
                        width: 50, height: 50,
                        // borderColor: 'red', borderWidth: 2,
                        bottom: 30
                      }}
                      source={this.state.modalImage}
                      // source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/President_Barack_Obama.jpg'}}
                    />

                    <Text
                      style={{
                        fontSize: 35,
                        color: 'black',
                        bottom: 20,
                        fontFamily: 'HelveticaNeue-Light' }}
                      closeOnClick={true}>Add Prescription</Text>



                    <FormLabel>Name</FormLabel>
                      <FormInput onChangeText={(text) => this.setState({text})}/>
                      <FormValidationMessage>Error message</FormValidationMessage> */}

                  <TextInput
                      style={{fontSize: 16, borderBottomWidth: 0.5, borderBottomColor: 'white', width: PAGE_WIDTH / 2,}}
                      placeholderTextColor='black'
                      placeholder="Prescription Name"
                    >
                    </TextInput>

                    <TextInput
                      style={{fontSize: 16, borderBottomWidth: 0.5, borderBottomColor: 'white', width: PAGE_WIDTH / 2,}}
                      placeholderTextColor='black'
                      placeholder="Physician"
                    >
                    </TextInput>

                    <TextInput
                      style={{fontSize: 16, borderBottomWidth: 0.5, borderBottomColor: 'white', width: PAGE_WIDTH / 2,}}
                      placeholderTextColor='black'
                      placeholder="Dosage"
                    >
                    </TextInput>

                    <TextInput
                      style={{fontSize: 16, borderBottomWidth: 0.5, borderBottomColor: 'white', width: PAGE_WIDTH / 2,}}
                      placeholderTextColor='white'
                      placeholder="Quantity"
                    >
                    </TextInput>

                    <TextInput
                      style={{fontSize: 16, borderBottomWidth: 0.5, borderBottomColor: 'white', width: PAGE_WIDTH / 2,}}
                      placeholderTextColor='white'
                      placeholder="Type"
                    >
                    </TextInput>

                    <TextInput
                      style={{fontSize: 16, borderBottomWidth: 0.5, borderBottomColor: 'white', width: PAGE_WIDTH / 2,}}
                      placeholderTextColor='white'
                      placeholder="RX Number"
                    >
                    </TextInput>

                    <TextInput
                      style={{fontSize: 16, borderBottomWidth: 0.5, borderBottomColor: 'white', width: PAGE_WIDTH / 2,}}
                      placeholderTextColor='white'
                      placeholder="Refills"
                    >
                    </TextInput>

                    <TextInput
                      style={{fontSize: 16, borderBottomWidth: 0.5, borderBottomColor: 'white', width: PAGE_WIDTH / 2,}}
                      placeholderTextColor='white'
                      placeholder="Recieved"
                    >
                    </TextInput>

                    <TextInput
                      style={{fontSize: 16, borderBottomWidth: 0.5, borderBottomColor: 'white', width: PAGE_WIDTH / 2,}}
                      placeholderTextColor='white'
                      placeholder="Expiration Date"
                    >
                    </TextInput>

                    <TextInput
                      style={{fontSize: 16, borderBottomWidth: 0.5, borderBottomColor: 'white', width: PAGE_WIDTH / 2,}}
                      placeholderTextColor='white'
                      placeholder="Pharmacy"
                    >
                    </TextInput>

                    <TextInput
                      style={{fontSize: 16, borderBottomWidth: 0.5, borderBottomColor: 'white', width: PAGE_WIDTH / 2,}}
                      placeholderTextColor='white'
                      placeholder="Pharmancy Phone #"
                    >
                    </TextInput>

                    <Text
                      onPress={this._hideModal}
                      style={{
                        borderWidth: 1,
                        borderColor: '#4CC5F8',
                        top: 23,
                        borderRadius: 4,
                        padding: 5
                      }}
                      >Done</Text>

                  </View>
                </View>
              </Modal>
            </View>
          </Button>
        </Right>
      </Header>
    );
  }
}

import React, { Component } from 'react';
import { Container, Header, Text, Button, TouchableOpacity, Left, Right, Body, Icon, View, Content, Form, Item, Input, Label } from 'native-base';
import { Drawer } from 'native-base';
import SideBar from './Sidebar';
import Modal from 'react-native-modal'
import { Image, TextInput, PAGE_WIDTH, ScrollView, StyleSheet } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

export default class RXHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      sideBarOpen: false,
      isModalVisible: false,
      text: '',
      name: '',
      physician: '',
      dosage: '',
      quantity: '',
      type: '',
      rx_number: '',
      refills: '',
      received: '',
      expiration_date: '',
      pharmacy: '',
      pharmacy_phone: ''
    };
  }

  addRx2press() {
    fetch('https://agile-forest-10594.herokuapp.com/addRx',
    {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: this.state.name,
        physician: this.state.physician,
        dosage: this.state.dosage,
        quantity: this.state.quantity,
        type: this.state.type,
        rx_number: this.state.rx_number,
        refills: this.state.refills,
        received: this.state.received,
        expiration_date: this.state.expiration_date,
        pharmacy: this.state.pharmacy,
        pharmacy_phone: this.state.pharmacy_phone,
      })
    })
    .then((response) => {
      console.log('response',response)
      return response.json()
    })
    .then((responseJson) => {
      console.log('repsonsejson', responseJson)
      if (responseJson.success) {
        this.props.navigation.navigate('Calendar');
      }
    })
    .catch((err) => {
      console.log('error', err)
    });
  }

  calendar() {
    this.props.navigation.navigate('Calendar')
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
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    height: 600,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    fontFamily: 'HelveticaNeue-Light'
                  }}>
                  <Button onPress={this._hideModal} style={{marginLeft: 295, marginTop: 0, marginBottom: 0, backgroundColor: '#F0BC0F'}}><Text>X</Text></Button>
                  {/* <Image style={{backgroundColor: 'transparent', resizeMode: 'contain', width: 50, height: 50, bottom: 30}}
                            source={require ('../../logo.png')}
                          /> */}
                  <Text
                    style={{marginLeft: 45, fontSize: 35, color: '#00adf5', marginTop: 20, fontFamily: 'HelveticaNeue-Light' }}>Add Prescription
                  </Text>

                  <ScrollView>
                  <Form>
                    <Item style={{padding: 0}} floatingLabel>
                      <Label >Name</Label>
                      <Input />
                    </Item>
                    <Item floatingLabel>
                      <Label>Rx Number</Label>
                      <Input />
                    </Item>
                    <Item floatingLabel>
                      <Label>Physician</Label>
                      <Input />
                    </Item>
                    <Item floatingLabel>
                      <Label>Pharmacy</Label>
                      <Input />
                    </Item>
                    <Item floatingLabel>
                      <Label>Pharmacy Phone #</Label>
                      <Input />
                    </Item>
                    <Item floatingLabel>
                      <Label>Date Recieved</Label>
                      <Input />
                    </Item>
                    <Item floatingLabel>
                      <Label>Expiration</Label>
                      <Input />
                    </Item>
                    <Item floatingLabel>
                      <Label>Refills Left</Label>
                      <Input />
                    </Item>
                    <Item floatingLabel>
                      <Label>Quantity</Label>
                      <Input />
                    </Item>
                    <Item floatingLabel>
                      <Label>Type (eg. tablet, capsule)</Label>
                      <Input />
                    </Item>
                  </Form>
                  <Button onPress={ () => {this.addRx2press()} } style={{marginLeft: 140, marginTop: 20, marginBottom: 20, backgroundColor: '#00adf5'}}><Text>Add</Text></Button>
                    {/* <Button onPress={this._hideModal} style={{marginLeft: 135, marginTop: 0, marginBottom: 20, backgroundColor: '#F0BC0F'}}><Text>Close</Text></Button> */}
                  </ScrollView>
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

const styles = StyleSheet.create({
  buttonAdd1: {
    backgroundColor: 'blue',
    flex: 1,
    position: 'absolute',
    backgroundColor: '#77adc6',
    height: 35,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 540,
    borderRadius: 5
  },
  buttonText: {
    margin: 15,
    marginLeft: 50,
    marginRight: 40,
    color: '#fff',
    fontSize: 14,
  },
})

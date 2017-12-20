import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  // KeyboardAwareScrollView,
  TextInput,
  ListView,
  Alert,
  // Button,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import { Container, Drawer, Form, Item, Input, Label, Button } from 'native-base';
import Geocoder from 'react-native-geocoding';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import { Constants } from 'expo';
import { Header } from 'react-native-elements';
import axios from 'axios';
import BackHeader from '../components/BackHeader.js';
import Sidebar from './Sidebar';

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;



// getFromLocation = () => {
//   Geocoder.setApiKey('AIzaSyBpBbtaKx4H35awztPfcEAZiA1tmCcNPGI'); // use a valid API key
//   Geocoder.getFromLocation("51 Kings Road Canton MA 02021").then(
//     json => {
//       var location = json.results[0].geometry.location;
//         alert(location.lat + ", " + location.lng);
//       },
//       error => {
//         alert(error);
//       }
//     );
// }


class Med extends React.Component {
  static navigationOptions = {
    title: 'Med',
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      current: [],
      isModalVisible: false,
      saveNotes: '',
      rxIsModalOpen: false,
      remisModalOpen: false,
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
      // reminders: []
    }
  }


  closeDrawer = () => {
    this.drawer._root.close()
  };

  openDrawer = () => {
    this.drawer._root.open()
  };

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })

  _rxshowModal = () => this.setState({ rxIsModalOpen: true })

  _rxhideModal = () => this.setState({ rxIsModalOpen: false })

  _remshowModal = () => this.setState({ remIsModalOpen: true })

  _remhideModal = () => this.setState({ remIsModalOpen: false })


  medList() {
    this.props.navigation.navigate('MedList');
  }

  saveNotes() {
    axios.post('https://agile-forest-10594.herokuapp.com/addNote', {
      noteBody: this.state.saveNotes,
      id: this.props.prescription
    })
    .then((resp) => {
      // console.log(resp)
      this.setState({saveNotes: resp.data})
    })
    .catch((error) => {error: error})
    }

//REMINDERS ROUTE
  // componentDidMount() {
  //   axios.post('https://agile-forest-10594.herokuapp.com/addReminder',
// })
  // }


  render() {
    let { text } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inside_cont}>
          <Drawer
            ref={(ref) => { this.drawer = ref; }}
            content={<Sidebar style={{flex: 1, height: 1000}}
            navigation={this.props.navigation}
          />}
            onClose={() => this.closeDrawer()} >
          <BackHeader
              currentScreen={'Med Info'}
              openDrawer={this.openDrawer}
              navigation={this.props.navigation}
              // onPress={() => this.medList()}
          />
            <ScrollView>
            <View style={styles.titlebox}>
              <Text style={{color: 'white', fontFamily: 'HelveticaNeue-Thin', fontSize: 48, top: 20}}>
                {this.props.navigation.state.params.prescription.name}
              </Text>

                <TouchableOpacity style={{alignSelf: 'flex-end', right: 30, bottom: 30}}
                  onPress={this._showModal}
                >
                  <Image style={{width: 90, height: 30 }} source={require ('../../refill.png')}/>
                </TouchableOpacity>
                  <Modal isVisible={this.state.isModalVisible}>
                    <View style={{ flex: 1 }}>
                      <View style={{ justifyContent: 'center', alignItems: 'center', height: 300, backgroundColor: 'lightgray', borderRadius: 5, top: 100}}>

                        <Image style={{backgroundColor: 'transparent', resizeMode: 'contain', width: 50, height: 50, bottom: 30}}
                          source={require ('../../logo.png')}
                        />

                          <Text style={{ fontSize: 35, color: '#4CC5F8', bottom: 20, fontFamily: 'HelveticaNeue-Light' }} closeOnClick={true}>Refill with Walgreens</Text>
                          <Text>
                            <Text style={{fontWeight: 'bold'}}>Rx #: </Text> {this.props.navigation.state.params.prescription.rx_number}
                          </Text>
                          <TextInput
                            style={{fontSize: 16, borderBottomWidth: 0.5, borderBottomColor: 'white', width: PAGE_WIDTH / 2}}
                            placeholderTextColor='white'
                            placeholder="Enter your Rx #"
                          >
                          </TextInput>
                          <TextInput
                            style={{fontSize: 16, borderBottomWidth: 0.5, borderBottomColor: 'white', width: PAGE_WIDTH / 2, paddingTop: 10}}
                            placeholderTextColor='white'
                            placeholder="Enter your address"
                          >
                          </TextInput>
                            <Text
                              onPress={this._hideModal}
                              style={{ borderWidth: 1, borderColor: '#4CC5F8', top: 23, borderRadius: 4, padding: 5 }}>Done</Text>
                        </View>
                      </View>
                    </Modal>

                    <Modal isVisible={this.state.remIsModalOpen}>
                      <View style={{ flex: 1 }}>
                        <View style={{ height: 600, backgroundColor: 'white', borderRadius: 5, fontFamily: 'HelveticaNeue-Light' }}>
                          <Button onPress={this._remhideModal} style={styles.remButton}>
                            <Text style={{marginLeft: 10, color: 'white'}}>X</Text>
                          </Button>
                          <Image style={{backgroundColor: 'transparent', resizeMode: 'contain', width: 50, height: 50, justifyContent: 'center', alignSelf: 'center'}}
                            source={require ('../../logo.png')}
                          />
                            <Text
                              style={{marginLeft: 45, fontSize: 35, color: '#00adf5', marginTop: 20, fontFamily: 'HelveticaNeue-Light' }}>Edit Med Info
                            </Text>


                              <ScrollView>

                              </ScrollView>
                        </View>
                      </View>
                    </Modal>

                    <Modal isVisible={this.state.rxIsModalOpen}>
                      <View style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                          <View style={{ justifyContent: 'center', alignItems: 'center', height: 300, backgroundColor: 'lightgray', borderRadius: 5, top: 100}}>

                            <Image style={{backgroundColor: 'transparent', resizeMode: 'contain', width: 50, height: 50, bottom: 30}}
                              source={require ('../../logo.png')}
                            />

                              <Text style={{ fontSize: 35, color: '#4CC5F8', bottom: 20, fontFamily: 'HelveticaNeue-Light' }} closeOnClick={true}>Refill with Walgreens</Text>
                              <Text>
                                <Text style={{fontWeight: 'bold'}}>Rx #: </Text> {this.props.navigation.state.params.prescription.rx_number}
                              </Text>
                              <TextInput
                                style={{fontSize: 16, borderBottomWidth: 0.5, borderBottomColor: 'white', width: PAGE_WIDTH / 2}}
                                placeholderTextColor='white'
                                placeholder="Enter your Rx #"
                              >
                              </TextInput>
                              <TextInput
                                style={{fontSize: 16, borderBottomWidth: 0.5, borderBottomColor: 'white', width: PAGE_WIDTH / 2, paddingTop: 10}}
                                placeholderTextColor='white'
                                placeholder="Enter your address"
                              >
                              </TextInput>
                                <Text
                                  onPress={this._rxhideModal}
                                  style={{ borderWidth: 1, borderColor: '#4CC5F8', top: 23, borderRadius: 4, padding: 5 }}>Done</Text>
                            </View>
                          </View>
                        </View>
                      </Modal>

                </View>
                <View style={styles.mainbox}>
                  <Text style={{color: '#4CC5F8', fontFamily: 'HelveticaNeue-Light', fontSize: 30, alignSelf: 'flex-start', paddingLeft: 20,
                    top: 10, position: 'absolute'}}>Reminders</Text>
                    <TouchableOpacity style={styles.edits, { borderWidth: 1, borderColor: '#4CC5F8', bottom: 170, borderRadius: 4, padding: 5, marginLeft: 250
                    }} onPress={this._remshowModal}
                    >
                      <Text>EDIT</Text>
                    </TouchableOpacity>
                      <ScrollView style={{color: 'white', fontFamily: 'HelveticaNeue-Light', fontSize: 20, alignSelf: 'flex-start', paddingLeft: 30, top: 50, position: 'absolute', maxHeight: 90, width: 320}}>
                        <Text>Every M, W, F</Text>
                        <Text>9:00 am</Text>
                        <Text>Take 2</Text>
                        <Text>{this.props.navigation.state.params.prescription.rx_number}</Text>
                        <Text>Take 2</Text>
                        <Text>Take 2</Text>
                        <Text>Take 2</Text>
                      </ScrollView>

                    <Text style={{color: '#4CC5F8', fontFamily: 'HelveticaNeue-Light', fontSize: 30, alignSelf: 'flex-start', paddingLeft: 20,
                      top: 130, position: 'absolute'}}>Rx Information</Text>
                    <TouchableOpacity style={styles.edits, { borderWidth: 1, borderColor: '#4CC5F8', bottom: 80, marginLeft: 250, borderRadius: 4, padding: 5
                    }} onPress={this._rxshowModal}
                    >
                      <Text>EDIT</Text>
                    </TouchableOpacity>
                      <ScrollView style={{color: 'white', fontFamily: 'HelveticaNeue-Light', fontSize: 20, alignSelf: 'flex-start', paddingLeft: 30, top: 170, position: 'absolute', maxHeight: 90, width: 320}}>

                      <Text>
                        <Text style={{fontWeight: 'bold'}}>Rx #: </Text> {this.props.navigation.state.params.prescription.rx_number}
                      </Text>
                      <Text>
                        <Text style={{fontWeight: 'bold'}}>Physician: </Text> {this.props.navigation.state.params.prescription.physician}
                      </Text>
                      <Text>
                        <Text style={{fontWeight: 'bold'}}>Pharmacy: </Text> {this.props.navigation.state.params.prescription.pharmacy}
                      </Text>
                      <Text>
                        <Text style={{fontWeight: 'bold'}}>Pharmacy Phone: </Text> {this.props.navigation.state.params.prescription.pharmacy_phone}
                      </Text>
                      <Text>
                        <Text style={{fontWeight: 'bold'}}>Refills Left: </Text> {this.props.navigation.state.params.prescription.refills}
                      </Text>
                      <Text>
                        <Text style={{fontWeight: 'bold'}}>Dosage: </Text> {this.props.navigation.state.params.prescription.dosage}
                      </Text>
                      <Text>
                        <Text style={{fontWeight: 'bold'}}>Quantity: </Text> {this.props.navigation.state.params.prescription.quantity}
                      </Text>
                      <Text>
                        <Text style={{fontWeight: 'bold'}}>Type: </Text> {this.props.navigation.state.params.prescription.type}
                      </Text>
                      <Text>
                        <Text style={{fontWeight: 'bold'}}>Date Received: </Text> {this.props.navigation.state.params.prescription.received}
                      </Text>
                      <Text>
                        <Text style={{fontWeight: 'bold'}}>Expiry Date: </Text> {this.props.navigation.state.params.prescription.expiration_date}
                      </Text>
                    </ScrollView>

                    <Text style={{color: '#4CC5F8', fontFamily: 'HelveticaNeue-Light', fontSize: 30, alignSelf: 'flex-start', paddingLeft: 20,
                      bottom: 140, position: 'absolute'}}>Notes</Text>
                    <TouchableOpacity onPress={() => this.saveNotes()} style={styles.edits, { borderWidth: 1, borderColor: '#4CC5F8', top: 23, borderRadius: 4, padding: 5, marginLeft: 250,
                    }}
                    >
                      <Text>SAVE</Text>
                    </TouchableOpacity>
                    <TextInput
                      style={styles.notes}
                      placeholder="Type anything..."
                      multiline={true}
                      numberOfLines={5}
                      onChangeText={(text) => this.setState({saveNotes: text})}
                      value={this.state.saveNotes}
                    />
                  </View>
                </ScrollView>
                </Drawer>
              </View>
          </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row'
    },
  inside_cont: {
    backgroundColor: '#F0F1F1',
    height: PAGE_HEIGHT,
    width: PAGE_WIDTH,
    // alignItems: 'center',
    // justifyContent: 'center',
    position: 'absolute'
    // padding: 20,
    // flex: 1
    // top: 500
  },
  titlebox: {
    backgroundColor: '#4CC5F8',
    borderColor: 'white',
    borderStyle: 'solid',
    borderRadius: 1,
    // opacity: 0.5,
    height: 100,
    width: 340,
    alignItems: 'flex-start',
    // justifyContent: 'center',
    borderRadius: 6,
    paddingLeft: 25,
    paddingBottom: 20,
    position: 'relative',
    // flexDirection: 'row',
    elevation: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: {
      height: 12
    },
    marginLeft: 20,
    marginTop: 20
  },
  logo: {
    backgroundColor: 'transparent',
    resizeMode: 'contain',
    width: 40,
    height: 40,
    position: 'absolute',
    marginLeft: 16
  },
  mainbox: {
    backgroundColor: '#F0F1F1',
    height: 440,
    width: 340,
    // paddingBottom: 10,
    position: 'relative',
    alignItems: 'center',
    top: 20,
    justifyContent: 'center',
    borderRadius: 6,
    elevation: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: {
      height: 12
    },
    paddingTop: 20,
    marginLeft: 20
  },
  button: {
    flex: 1,
    marginLeft: 125,
    marginTop: 20,
    position: 'absolute',
    backgroundColor: '#4cc5f8',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    top: 560,
    borderRadius: 5
    },
  buttonText: {
    margin: 15,
    marginLeft: 10,
    marginRight: 10,
    color: '#fff',
    fontSize: 14,
    },
  notes: {
    backgroundColor: 'transparent',
    borderWidth: 0.2,
    borderColor: 'black',
    // borderRightWidth: 0.2,
    borderRadius: 2,
    height: 120,
    width: 300,
    top: 300,
    position: 'absolute',
    color: 'black',
    padding: 6,
  },
  edits: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    padding: 5
  },
  remButton: {
    marginLeft: 295,
    marginTop: 5,
    marginBottom: 0,
    backgroundColor: '#F0BC0F',
    width: 30,
    height: 30
  }
});

export default Med;
console.disableYellowBox = true;

const users = [
 {
    rx: 'Advil',
    img: 'https://www.shareicon.net/download/2016/10/12/843256_medical_512x512.png'
 }
 ]

import React, { Component } from 'react';
import {AsyncStorage, StyleSheet, View, Text, TouchableOpacity, TextInput, CardView, Alert, Dimensions, Image, ScrollView,
} from 'react-native';
import { Constants } from 'expo';
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;
import { Container, Content, Card, CardItem, Right, Left, Button, SearchBar, Icon, Item, Input, Drawer} from 'native-base';
import { Header } from 'react-native-elements';
import Sidebar from './Sidebar';
import RXHeader from '../components/RXHeader.js';



export default class PillCard extends Component {
  static navigationOptions = {
    title: 'PillCard',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }
  closeDrawer = () => {
  this.drawer._root.close()
};

openDrawer = () => {
  this.drawer._root.open()
};

  render() {
    return (
<Container>
  <View style={{flex: 1}}>
       <View style={styles.inside_cont}>
       <Drawer
         ref={(ref) => { this.drawer = ref; }}
         content={<Sidebar style={{flex: 1, height: 1000}}
           navigation={this.props.navigation}
         />}
         onClose={() => this.closeDrawer()} >
       <RXHeader openDrawer={this.openDrawer} />
  <View style={{backgroundColor: 'transparent', width: '88%', flexDirection: 'row', alignSelf: 'left', paddingTop: 7, paddingBottom: 10, paddingLeft: 3}} searchBar rounded>
        <Item style={{backgroundColor: 'white', alignSelf: 'center',paddingLeft: 5}}>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
        </Item>
              <Button style = {{marginLeft: 3, backgroundColor: 'lightgray', width: 38}}>
                <Text style={{color: 'white', fontWeight: 'bold', fontFamily: 'HelveticaNeue-Light', fontSize: 8, marginLeft: 4}}>Search</Text>
              </Button>
  </View>
    <View style={styles.container}>

      <View style={styles.inside_cont}>
        <View style={styles.titlebox}>
            <Image style={styles.logo} source={require ('../../logo.png')}/>
            <Text style={{color: 'white', fontFamily: 'HelveticaNeue-Light', fontSize: 32, textAlign: 'left'}}> My Prescriptions </Text>
            <Text style={{color: 'white', fontFamily: 'HelveticaNeue-Light', fontSize: 14, textAlign: 'left'}}>   Select a prescription to view details.</Text>
        </View>
          <Card style={{  marginTop: 10, alignItems: 'flex-start', backgroundColor: 'transparent'}}>
              <CardItem style={styles.cardItem}>
                  <Icon style={styles.iconic} name="ios-contrast-outline"/>
                <Text style={styles.rxText}>Birth Control</Text>
              </CardItem>
              <CardItem style={styles.cardItem}>
                  <Icon style={styles.iconic} name="ios-contrast-outline"/>
                <Text style={styles.rxText}>Advil</Text>
              </CardItem>
              <CardItem style={styles.cardItem}>
                  <Icon style={styles.iconic} name="ios-contrast-outline"/>
                <Text style={styles.rxText}>B12</Text>
              </CardItem>
              <CardItem style={styles.cardItem}>
                  <Icon style={styles.iconic} name="ios-contrast-outline"/>
                <Text style={styles.rxText}>Vitamin D</Text>
              </CardItem>
              <CardItem style={styles.cardItem}>
                  <Icon style={styles.iconic} name="ios-contrast-outline"/>
                <Text style={styles.rxText}>Adderall</Text>
              </CardItem>
              <CardItem style={styles.cardItem}>
                  <Icon style={styles.iconic} name="ios-contrast-outline"/>
                <Text style={styles.rxText}>Insulin</Text>
              </CardItem>
          </Card>
      {/* view above ends Cardbox */}
      </View>
    </View>
    <Text>All Meds</Text>
      </Drawer>
      </View>
      </View>
</Container>
      );
      }
      }
      const styles = StyleSheet.create({
      container: {
      flex: 1,
      },

      inside_cont: {
      backgroundColor: '#C6E2FF',
      height: PAGE_HEIGHT,
      width: PAGE_WIDTH,
      backgroundColor: '#F0F1F1',
      position: 'absolute',
      padding: 0
      },

      rxText: {
      fontFamily: 'HelveticaNeue-Light',
      color:'#4CC5F8',
      fontSize: 30
      },

      iconic: {
      color:'gray',
      marginTop: 8,
      paddingLeft: 10,
      paddingRight: 40,
      fontSize: 20
      },

      titlebox: {
      backgroundColor: '#4CC5F8',
      borderColor: 'white',
      borderStyle: 'solid',
      borderRadius: 1,
      // opacity: 0.5,
      height: 100,
      width: 350,
      alignSelf: 'center',
      justifyContent: 'center',
      borderRadius: 6,
      paddingLeft: 65,
      position: 'relative',
      // flexDirection: 'column',
      elevation: 10,
      shadowColor: '#000000',
      shadowOpacity: 0.3,
      shadowRadius: 15,
      shadowOffset: {
      height: 12
      }
      },

      cardItem: {
        backgroundColor: '#F0F1F1',
        alignItems: 'flex-start',
        alignSelf: 'center',
        fontFamily: 'HelveticaNeue-Light',
        width: 300,
        height: 55,
        marginTop: 7,
        borderRadius: 6,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: {
            height: 6
          }
        },

      logo: {
      backgroundColor: 'transparent',
      resizeMode: 'contain',
      width: 40,
      height: 40,
      position: 'absolute',
      marginLeft: 5
      },

      mainbox: {
      backgroundColor: '#CAE1FF',
      height: 430,
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
      paddingTop: 20
      }

      });
  //eventually color code icons with color button on calendar and header on indivdual pill page

  //https://materialdesignicons.com/

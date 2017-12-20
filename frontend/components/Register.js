import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  Dimensions,
  Image,
  Animated,
  // LayoutAnimation
} from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Constants } from 'expo';
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

class FadeIn extends React.Component {
  state = {
    fadeInAnim: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.timing(this.state.fadeInAnim, {
        toValue: 1,
        duration: 5000,
        // easing: Easing.bounce()
      }).start();
  }

  render() {
    let { fadeInAnim } = this.state;
    return (
      <Animated.View style={{ ...this.props.style, opacity: fadeInAnim }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

class Register extends React.Component {
  static navigationOptions = {
    title: 'Register',
    header: null
  };
  constructor() {
    super();
    this.state = {
      username:'',
      password:'',
      password2: '',
      firstName: '',
      lastName: '',
      email: ''
    }
  }
  register2press() {
    fetch('https://agile-forest-10594.herokuapp.com/register',
    {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        password2: this.state.password2,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
      })
    })
    .then((response) => {
      //res.json({someresponse: stuffyouwanttosend})
      console.log('response',response)
      return response.json()
    })
    .then((responseJson) => {
      console.log('repsonsejson', responseJson)
      if (responseJson.success) {
        this.props.navigation.navigate('Login');
      }
    })
    .catch((err) => {
      console.log('error', err)
    });
  }

  login() {
    this.props.navigation.navigate('Login');
  }

  render() {

    return (
      <View style={styles.container1}>
          <Image onLoadEnd={()=>this.setState({loadEnd:true})} style={styles.background} source={require ('../../bluecrop.png')} />
          <FadeIn>
          <TouchableOpacity>
            <Image style={{backgroundColor: 'transparent', resizeMode: 'contain', width: 50, height: 50, top: 60}}
            source={require ('../../logo.png')}
            />
          </TouchableOpacity>
        </FadeIn>
        <View style={{flex: 1}}>
          <View style={styles.reg}>
        <Text style={styles.title}>Register</Text>
          <TextInput
            style={{fontFamily: 'HelveticaNeue-Light',
              top: 130,
              flex: 0,
              backgroundColor: 'transparent',
              height: 30,
              // alignItems: 'center',
              // justifyContent: 'center',
              borderBottomWidth: 0.5,
              borderBottomColor: 'white',
              width: PAGE_WIDTH / 2,
              fontSize: 16,}}
            placeholderTextColor="white"
            placeholder="First Name"
            onChangeText={(text) => this.setState({firstName: text})}
          />
          <TextInput
            style={{fontFamily: 'HelveticaNeue-Light',
              top: 140,
              flex: 0,
              backgroundColor: 'transparent',
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomWidth: 0.5,
              borderBottomColor: 'white',
              width: PAGE_WIDTH / 2,
              fontSize: 16,}}
            placeholderTextColor="white"
            placeholder="Last Name"
            onChangeText={(text) => this.setState({lastName: text})}
          />
        <TextInput
          style={{fontFamily: 'HelveticaNeue-Light',
            top: 150,
            flex: 0,
            backgroundColor: 'transparent',
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: 'white',
            width: PAGE_WIDTH / 2,
            fontSize: 16,}}
          placeholderTextColor="white"
          placeholder="Username"
          onChangeText={(text) => this.setState({username: text})}
        />
        <TextInput
          style={{fontFamily: 'HelveticaNeue-Light',
            top: 160,
            flex: 0,
            backgroundColor: 'transparent',
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: 'white',
            width: PAGE_WIDTH / 2,
            fontSize: 16,}}
          placeholderTextColor="white"
          placeholder="Email"
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput
          style={{fontFamily: 'HelveticaNeue-Light',
            top: 170,
            flex: 0,
            backgroundColor: 'transparent',
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: 'white',
            width: PAGE_WIDTH / 2,
            fontSize: 16,}}
          placeholderTextColor="white"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password: text})}
        />
        <TextInput
          style={{fontFamily: 'HelveticaNeue-Light',
            top: 180,
            flex: 0,
            backgroundColor: 'transparent',
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: 'white',
            width: PAGE_WIDTH / 2,
            fontSize: 16,}}
          placeholderTextColor="white"
          placeholder="Repeat Password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password2: text})}
        />
      </View>
      </View>
        <TouchableOpacity style={styles.buttonRegister1} onPress={ () => {this.register2press()} }>
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => {this.login()} } style={{top: 620}}>
          <Text style={{color: '#6B91B0'}}>{"Already a user? Login here"}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container1: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      flex: 1,
      flexDirection: 'column'
    },
  title: {
      fontSize: PAGE_WIDTH / 9,
      // fontWeight: 'bold',
      fontFamily: 'HelveticaNeue-Thin',
      color: '#fff',
      backgroundColor: 'transparent',
      textAlign: 'center',
      lineHeight: 50,
      top: 110
    },
  buttonRegister1: {
      backgroundColor: 'blue',
      flex: 1,
      position: 'absolute',
      backgroundColor: '#77adc6',
      height: 35,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      top: 465,
      borderRadius: 5
    },
  buttonText: {
      margin: 15,
      marginLeft: 50,
      marginRight: 40,
      color: '#fff',
      fontSize: 14,
    },
  background: {
    backgroundColor: 'transparent',
    flex: 1,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    resizeMode: 'cover',
    top: 0,
    position: 'absolute',
    justifyContent: 'center',
    margin: 'auto'
  },
});


  export default Register;

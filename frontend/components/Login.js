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
  Easing,
  ScrollView,
  KeyboardAvoidingView

} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Constants } from 'expo';
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;
import Register from './Register.js';

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
    // let { fadeOutAnim } = this.state;
    return (
      <Animated.View style={{ ...this.props.style, opacity: fadeInAnim }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

class Login extends React.Component {
  static navigationOptions = {
    title: 'Login',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      err:'',
      image: ''
    }

    // console.log(this.props);
  }

  componentDidMount() {
    AsyncStorage.getItem('user')
    .then(result => {
      var parsedResult = JSON.parse(result);
      var username = parsedResult.username;
      var password = parsedResult.password;
      if (username && password) {
        return login(username, password)
      }
    })
    .catch(err => { /* handle the error */ })
  }


  login2press() {
    fetch('https://agile-forest-10594.herokuapp.com/login',
    {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.success) {
        // alert('Successfully Logged In')
        AsyncStorage.setItem('user', JSON.stringify({
          username: this.state.username,
          password: this.state.password
        }))
        .then(() => this.props.navigation.navigate('Calendar'))
      } else {
        this.setState({error: 'error'});
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  register() {
    this.props.navigation.navigate('Register');
  }

  // med() {
  //   this.props.navigation.navigate('Med');
  // }
  //
  // pillcard() {
  //   this.props.navigation.navigate('PillCard');
  // }

  render() {
    return (

<KeyboardAvoidingView style={styles.container1} behavior="padding">
    <Image onLoadEnd={()=>this.setState({loadEnd:true})} style={styles.background} source={require ('../../smallblue.png')} />
  <FadeIn>
  <TouchableOpacity>
  <Image style={{backgroundColor: 'transparent', resizeMode: 'contain', width: 150, height: 150, top: 0}}
    source={require ('../../logo.png')}
  />
  </TouchableOpacity>
</FadeIn>

  <Text style={styles.title}>Rx Tracker</Text>
  <Text style={styles.desc, {
    fontFamily: 'HelveticaNeue-Light',
    fontSize: 17,
    color: 'white',
    top: 60,
    padding: 20
  }}>
    The one-stop-shop for keeping track of<Text style={{fontStyle: 'italic'}}> ALL<Text style={{fontStyle: 'normal'}}> your prescriptions</Text></Text>
  </Text>

  <TextInput
    style={{fontFamily: 'HelveticaNeue-Light',
    top: 40,
    flex: 0,
    backgroundColor: 'transparent',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'white',
    width: PAGE_WIDTH / 2,
    fontSize: 16
    }}

    placeholderTextColor="white"
    placeholder="Username"
    onChangeText={(text) => this.setState({username: text})}
  />
  <TextInput
    style={{fontFamily: 'HelveticaNeue-Light',
    top: 60,
    flex: 0,
    backgroundColor: 'transparent',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'white',
    width: PAGE_WIDTH / 2,
    fontSize: 16,
  }}
    placeholderTextColor="white"
    placeholder="Password"
    secureTextEntry={true}
    onChangeText={(text) => this.setState({password: text})}
  />

  {/* <TouchableOpacity onPress={ () => this.med() }>
    <Text style={{backgroundColor: 'yellow', top: 230}}>{"PILL PAGE"}</Text>
  </TouchableOpacity> */}

  {/* <TouchableOpacity onPress={ () => this.pillcard() }>
    <Text style={{backgroundColor: 'green', top: 250}}>{"PILL CARD"}</Text>
  </TouchableOpacity> */}

  <TouchableOpacity onPress={ () => this.login2press() } style={styles.buttonLogin1}>
    <Text style={styles.buttonText}>{"LOGIN"}</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={ () => this.register() } style={{top: 530}}>
    <Text style={{color: '#6B91B0'}}>{"Don't have an account? Sign up here"}</Text>
  </TouchableOpacity>
</KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  container1: {
    flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
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
      top: 10
    },
  buttonLogin1: {
      backgroundColor: 'blue',
      flex: 1,
      position: 'absolute',
      backgroundColor: '#77adc6',
      height: 35,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      top: 580,
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
    // height: PAGE_HEIGHT,
    resizeMode: 'cover',
    top: 0,
    position: 'absolute',
    justifyContent: 'center',
    margin: 'auto'
  }
});

export default Login;

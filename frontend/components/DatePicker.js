import React, { Component } from 'react';
import {TextInput, StyleSheet, View, Text, Button, TouchableOpacity, Header} from 'react-native';
import { Constants, Notifications, Permissions } from 'expo';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class DatePicker extends React.Component {
  static navigationOptions = {
    title: 'DatePicker',
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      date: '',
    };
  }

  componentDidMount() {
    console.log('componentDidMount Date', this.props.name);
  }
  async componentDidMount() {
    let {result} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.isDevice && result.status === 'granted') {
      console.log('Notification permissions granted.')
    }
  };

  stdTime(t) {
    // let t = new Date();
    // t.setSeconds(t.getSeconds() + 10);
    let current = new Date(t);
    let setTime = current.toTimeString().split(' ')[0].split(':');

    // time = time.split(':'); // convert to array

    // fetch
    var hours = Number(setTime[0]);
    var minutes = Number(setTime[1]);
    var seconds = Number(setTime[2]);

    // calculate
    var timeValue;

    if (hours > 0 && hours <= 12)
    {
      timeValue= "" + hours;
    } else if (hours > 12)
    {
      timeValue= "" + (hours - 12);
    }
    else if (hours == 0)
    {
      timeValue= "12";
    }

    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;  // get seconds
    timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM

    // show
    console.log(timeValue);

    return timeValue;

  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  //
  _handleDatePicked = (date) => {
    this.setState({date:date});
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
    // let t = new Date();
    // t.setSeconds(t.getSeconds() + 10);
    // let current = new Date(t);
    // var setTime = current.toTimeString().split(' ')[0];
    let t = new Date();
    t.setSeconds(t.getSeconds() + 10);
    var setTime = this.stdTime(t);
    console.log('setTime', setTime);
    // console.log('this is t', t);
    // console.log('name', this.state.name);
    const localNotification = {
        title: 'RXTracker REMINDER',
        body: 'Take your ' + this.props.name, // (string) — body text of the notification.
        // make the word PILL = the params for the pill on the given page
      };
      console.log('local notification', localNotification)
    const schedulingOptions = {
        time: t // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
      };
      // console.log('scheduling options', schedulingOptions);
      Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
  };

  render () {
    console.log('name', this.props);
    return (
      <View style={{ flex: 1 }}>
        {/* <TouchableOpacity onPress={this._showDateTimePicker}>
          <View style={{justifyContent: 'center', alignItems: 'center', width: 160, height: 35, backgroundColor: 'lightgray', borderRadius: 5}}>
            <Text>Select Time</Text>
          </View>
        </TouchableOpacity>
        <DateTimePicker
          mode={'time'}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        /> */}
      </View>
    );
  }
}

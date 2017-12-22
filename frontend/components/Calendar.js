import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {Agenda} from 'react-native-calendars';
// import moment from 'moment';
// import type Moment from 'moment';
import { Header } from 'react-native-elements';
import RXHeader from '../components/RXHeader.js';
import { Drawer } from 'native-base';
import SideBar from './Sidebar';
export default class Calendar extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      drugSched: {0: [{name:'sundrug1', color: 'red'},{name: 'sundrug2', color: 'blue'}], 1: [{name: 'mondrug2', color: 'green'}]},
      items: {},
    };
  }
  // toggleModal() {
  //
  // }
  componentDidMount() {
    // /getMedSchedule
      //{0: [prec 1, presc2], 1: []}
  }
  renderItem(item) {
    console.log('renderitem item', item);
    return (
      <View style={[styles.item, {height: item.height, backgroundColor: item.color}]}><Text>{item.name}</Text></View>
    );
  }
  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>No prescriptions to take today</Text></View>
    );
  }
  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }
  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
  loadItems(day) {
    // setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        console.log('strtime', strTime); //2018-03-14
        var dayOfWeek = new Date(strTime).getDay();
        console.log('dayOfWeek', dayOfWeek);
        var drugsForDay = this.state.drugSched[dayOfWeek]
        console.log('drugs for day', drugsForDay);
        if (!this.state.items[strTime]) {
          var stateCopy = Object.assign({}, this.state.items)
          if(drugsForDay){
            console.log('there are drugs for this day');
            stateCopy[strTime] = drugsForDay;
          } else {
            console.log('no drugs for day');
            stateCopy[strTime] = [];
          }
          this.setState({items: stateCopy});
        }
      }
      console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    // }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };
  render() {
    // console.log(AWS_ACCESS_KEY_ID)
    return (
      <View style={{flex: 1}}>
        {/* <RXHeader toggleModal={toggleModal}/> */}
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<SideBar style={{flex: 1, height: 1000}} navigation={this.props.navigation} />}
          // content={<SideBar style={{flex: 1, height: 1000}} navigation={this.props.navigation} />}
          onClose={() => this.closeDrawer()} >
        <RXHeader openDrawer={this.openDrawer} />
        {/* <Header
          statusBarProps={{ barStyle: 'light-content' }}
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'RX TRACKER', style: { color: '#fff'} }}
          rightComponent={{ icon: 'edit', color: '#fff' }}
          outerContainerStyles={{ backgroundColor: '#00adf5' }}
          innerContainerStyles={{ justifyContent: 'space-around',}}
        /> */}
        <Agenda
          items={this.state.items}
          loadItemsForMonth={(day) => {
            console.log('load items for month', day);
            // day =   {year: 2017, month: 11, day: 22, timestamp: 1511308800000, dateString: "2017-11-22"}
            this.loadItems(day)}
          }
          // selected={'2017-05-16'}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          markedDates={{[this.state.selected]: {selected: false}}}
        />
        </Drawer>
      </View>
    );
  }
// //dumb random item generator - only to be used as dummy data cause idgaf to hard code shit
  // loadItems(day) {
  //   setTimeout(() => {
  //     for (let i = -15; i < 85; i++) {
  //       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //       const strTime = this.timeToString(time);
  //       if (!this.state.items[strTime]) {
  //         this.state.items[strTime] = [];
  //         const numItems = Math.floor(Math.random() * 5);
  //         for (let j = 0; j < numItems; j++) {
  //           this.state.items[strTime].push({
  //             name: 'Prescription: ' + strTime,
  //             // height: Math.max(50, Math.floor(Math.random() * 150))
  //           });
  //         }
  //       }
  //     }
  //     //console.log(this.state.items);
  //     const newItems = {};
  //     Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
  //     this.setState({
  //       items: newItems
  //     });
  //   }, 1000);
  //   // console.log(`Load Items for ${day.year}-${day.month}`);
  // }
// //!!!! DO NOT DELETE. UNCOMMENT!!!! //
  // loadItems(day) {
  //   // setTimeout(() => {
  //     for (let i = -15; i < 85; i++) {
  //       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //       const strTime = this.timeToString(time);
  //       console.log('strtime', strTime);
  //       if (!this.state.items[strTime]) {
  //         var stateCopy = Object.assign({}, this.state.items)
  //         stateCopy[strTime] = [];
  //         this.setState({items: stateCopy});
  //       }
  //     }
  //     console.log(this.state.items);
  //     const newItems = {};
  //     Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
  //     this.setState({
  //       items: newItems
  //     });
  //   // }, 1000);
  //   // console.log(`Load Items for ${day.year}-${day.month}`);
  // }
  // renderItem(item) {
  //   return (
  //     <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
  //   );
  // }
  //
  // renderEmptyDate() {
  //   return (
  //     <View style={styles.emptyDate}><Text>No prescriptions to take today</Text></View>
  //   );
  // }
  //
  // rowHasChanged(r1, r2) {
  //   return r1.name !== r2.name;
  // }
  //
  // timeToString(time) {
  //   const date = new Date(time);
  //   return date.toISOString().split('T')[0];
  // }
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 45
  }
});

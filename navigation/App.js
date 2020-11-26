// @ 페이지 이동 : Push / Pop(AppBar)
// - page1 : Nav 
// - page2 : MainPage

// @ 기존 코드의 내용을 최대한 살려서 비교할 수 있도록하였습니다

// @ install [ terminal ]
// > npm i @react-navigation/native
// > expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
// > npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
// > npx pod-install ios

// @ install 2 [ terminal ]
// [x] Satck Navigation 
// > npm install --save @react-navigation/stack
// [ ] Drawer Navigation
// > npm install --save @react-navigation/drawer 
// [ ] Bottom Tab Navigation 
// > npm install --save @react-navigation/bottom-tabs
// [ ] Material Bottom Tap Navigation 
// > npm install --save @react-navigation/material-bottom-tabs react-native-paper
// [ ] Material Top Tab Navition
// > npm install --save @react-navigation/material-top-tabs react-native-tab-view


import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView
} from 'react-native';
import { Appbar } from 'react-native-paper';
import MainPage from './pages/mainPage.js';
import Nav from './pages/nav.js';

import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  // return (
  //   <SafeAreaView style={{flex:1}}>
  //   <View style={styles.container}>
  //       <Appbar style={{width: '100%'}}>
  //         <Text style={{color:'white', fontWeight: 'bold', marginLeft:30}}>James 제임쓰 Dev</Text>
  //       </Appbar>
  //       <View style={styles.containerInContainer}>
  //         <Image style={styles.imgSt} source={{uri:'https://raw.githubusercontent.com/doyle-flutter/Recipe/master/2019-11-21.webp'}}/>
  //         <Text>{"\n"} Flutter {'\&'} ReactNative </Text>
  //         <StatusBar style="auto" />
  //         {/* <Button onPress={aa} accessibilityLabel={"ReactNative vs Flutter"}>  </Button>*/}
  //         <TouchableOpacity onPress={aa}> 
  //           <Text style={{borderWidth:2,borderColor:'green', borderRadius:10, padding:10, fontWeight:'bold'}}>
  //               ReactNative
  //           </Text>
  //           <Text></Text>
  //         </TouchableOpacity >
  //         <MainPage></MainPage>
  //       </View>
  //   </View>
  //   </SafeAreaView>
  // );
  // return (<Nav></Nav>);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">{props => <Nav {...props} extraData={"HOME"} />}</Stack.Screen>
        {/* <Stack.Screen name="Page2">{props => <Nav {...props} extraData={"PAGE2"} />}</Stack.Screen> */}
        <Stack.Screen name="Page2">{props => <MainPage {...props} extraData={"MAINPAGE"} />}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function aa(){
  console.log('Click Btn');
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },
  containerInContainer:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgSt : {
    borderRadius: 10,
    width: 200,
    height: 200,
    margin: 10
  }
});

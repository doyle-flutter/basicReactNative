// 기존 코드의 내용을 최대한 살려서 비교할 수 있도록하였습니다

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView
} from 'react-native';
import { Appbar } from 'react-native-paper';
import MainPage from './pages/mainPage.js';
import Nav from './navigation/nav.js';

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

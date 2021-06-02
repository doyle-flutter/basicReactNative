// *
// version 초기화 필요
// 하나로 테스트 및 빌드 실행하셔도 됩니다.
// 다만 실제 배포에는 테스트 내용을 지워야합니다.

import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, ScrollView, Text, View, Image, Button, TouchableOpacity, Platform, Alert } from 'react-native';
import {useDimensions, useDeviceOrientation} from '@react-native-community/hooks'
import { WebView } from 'react-native-webview';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';

const _version = '';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Stack = createStackNavigator();

export default function App() {
  return (<NavigationContainer>
    <Stack.Navigator initialRouteName={`Sec${_version}`}>
        <Stack.Screen name={`Sec${_version}`} component={MainView} />
        <Stack.Screen name="Details" component={DetailView} />
      </Stack.Navigator>
  </NavigationContainer>);
}

function Row({children, rowStyle}){
  if(!rowStyle){rowStyle = {flex:1, flexDirection:"row"}}
  rowStyle = Object.assign(rowStyle, {flex:1, flexDirection:"row"});
  return (<View style={rowStyle}>{children}</View>);
}

function Column({children, colStyle}){
  if(!colStyle){colStyle = {flex:1, flexDirection:"column"}}
  colStyle = Object.assign(colStyle, {flex:1, flexDirection:"column"});
  return (<View style={colStyle}>{children}</View>);
}

function MainView({navigation}){

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  let [serverCheck, setServerCheck] = useState(false);
  let [ErrorCheck, setErrorCheck] = useState("NONE");
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token))
      .then( _ => registerForPushNotificationsAsync2(Notifications.getExpoPushTokenAsync({experienceId: '@kjames/sec',})))
      .catch(_ => alert(_));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => setNotification(notification));
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => console.log(response));

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync2({data, type}) {
    const expoPushToken = await Notifications.getExpoPushTokenAsync({experienceId: '@jamessdev/sec',});
    await axios.post(
      "https://us-central1-playdog-6014c.cloudfunctions.net/expo",
      {data,expoPushToken},
      {headers: {'Content-Type': 'application/json',}}
    )
    .then(function (response) {
      setServerCheck(response.data);
      return;
    })
    .catch(function (error) {
      setErrorCheck(error);
      return;
    });
    return true;
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  const {landscape} = useDeviceOrientation();
  const {width, height} = useDimensions().window;

  const _titleTextViews = ({items}) => items.map(e => <Text 
        style={{ flex:1, color: "black", fontWeight: "bold", textAlign:"center", fontSize: 20, margin:20}}
        key={e+"tm"} >{e}
      </Text>
    );

  const _textViews = ({items}) => items.map(e => <Text 
        style={{ flex:1, color: "black", textAlign:"center", fontSize: 18, margin:20}}
        key={e+"tm"} >{e}
      </Text>
    );

  const _btnViews = ({items}) => items.map((e, index) => <View 
    key={index+123}
    style={{flex:1, alignItems:'center'}}>
      <TouchableOpacity 
          key={index+123}
          style={{margin: 20, backgroundColor: "red", width:100, padding:10}} 
          onPress={()=> navigation.navigate('Details',{uri: e.uri})} >
          <Text style={{textAlign:'center', color:'white'}}>{e.title.toString()}</Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{width}}>
          <View style={{backgroundColor:"red",width:"100%",height: landscape ? height*0.5 : height*0.3,}}>
            <Image source={{uri: "https://avatars.githubusercontent.com/u/56661529?v=4",}} style={{width: "100%", height: "100%"}} />
          </View>
          <View style={{height: 30}}><Text>{serverCheck ? "HI?" : "Load..."}</Text></View>
          <View><Text>{`Server Error ? : ${ErrorCheck}`}</Text></View>
          <Row children={_titleTextViews({items: ["JamesDev","😈"]})} rowStyle={{height: height*0.1, alignItems: "center" }}></Row>
          <Row children={_textViews({items: ["RN","🔗","Flutter"]})}></Row>
          <View style={{padding: 20, borderTopWidth: 2, margin: 20}}><Text style={{fontWeight:"bold"}}> [ Channel ]</Text></View>
          <Column children={
            _btnViews({
              items: [
                {title: "Youtube", uri: "https://www.youtube.com/channel/UCjpik_Cbt0SeE5kBzao4nqg"},
                {title: "Naver", uri:"https://cafe.naver.com/flutterjames"},
                {title :"Taling", uri:"https://taling.me/Talent/Detail/10726"},
                {title: "Github", uri: "https://github.com/doyle-flutter"}
              ]
            })}></Column>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailView({route}){
  const { uri } = route.params;
  console.log(uri);
  return (
    <View style={{flex:1}}><WebView style={{flex:1, width:"100%", height:"100%"}} source={{ uri }}></WebView></View>
  );
}

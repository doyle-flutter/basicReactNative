// 버튼 수정 및 코드 푸쉬

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import {useDimensions, useDeviceOrientation} from '@react-native-community/hooks'
import { WebView } from 'react-native-webview';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (<NavigationContainer>
    <Stack.Navigator initialRouteName="Main2">
        <Stack.Screen name="Main2" component={MainView} />
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
  var {landscape} = useDeviceOrientation();
  var {width, height} = useDimensions().window;

  var _titleTextViews = ({items}) => items.map(e => <Text 
        style={{ flex:1, color: "black", fontWeight: "bold", textAlign:"center", fontSize: 20, margin:20}}
        key={e+"tm"} >{e}
      </Text>
    );

  var _textViews = ({items}) => items.map(e => <Text 
        style={{ flex:1, color: "black", textAlign:"center", fontSize: 18, margin:20}}
        key={e+"tm"} >{e}
      </Text>
    );

  var _btnViews = ({items}) => items.map((e, index) => <View 
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

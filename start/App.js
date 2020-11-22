import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity, Button , SafeAreaView} from 'react-native';
import { Appbar } from 'react-native-paper';

export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
        <Appbar style={{width: '100%'}}>
          <Text style={{color:'white', fontWeight: 'bold', marginLeft:30}}>James 제임쓰 Dev</Text>
        </Appbar>
        <View style={styles.containerInContainer}>
          <Image style={styles.imgSt} source={{uri:'https://raw.githubusercontent.com/doyle-flutter/Recipe/master/2019-11-21.webp'}}/>
          <Text>{"\n"} Flutter {'\&'} ReactNative </Text>
          <StatusBar style="auto" />
          {/* <Button onPress={aa} accessibilityLabel={"ReactNative vs Flutter"}>  </Button>*/}
          <TouchableOpacity onPress={aa}> 
            <Text style={{borderWidth:2,borderColor:'green', borderRadius:10, padding:10, fontWeight:'bold'}}>
                ReactNative
            </Text>
          </TouchableOpacity >
          
        </View>
      
    </View>
    </SafeAreaView>
  );
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

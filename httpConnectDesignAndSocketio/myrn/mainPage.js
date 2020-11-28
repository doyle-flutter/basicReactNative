import React, {Component} from 'react';
import {View, Text, Button, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {ExamModel, MyServerDataModel} from '../models/examModel.js';
import { io } from 'socket.io-client';

class MainPage extends Component{
    constructor(props){
        super(props);
        this.state = {viewTxt : '', myServerData: {}, docServerData:[]};
        fetch('http://127.0.0.1:3001/data/all')
            .then((response) => response.json())
            .then((json) => MyServerDataModel.fromJson(json))
            .then((result) => {
                console.log('1. constructor : ');
                console.log(result);
                this.setState({
                    myServerData: result
                });
                return;
            })
            .catch(_ => console.log("Err!"));
            const socket = io("ws://127.0.0.1:3001", {
                reconnectionDelayMax: 10000
            });

    }

    componentDidMount(){
        this.setState({viewTxt : '안녕하세요'});
        fetch('https://reactnative.dev/movies.json')
            .then((response) => response.json())
            .then((json) => json.movies.map(e => ExamModel.fromJson(e)))
            .then(result => {
                console.log(`2. componentDidMount : `);
                console.log(result);
                this.setState({
                    docServerData: result
                });
                return;
            })
            .catch(_ => console.log("Err!"));
    }
    
    render(){
        return (
            <View style={this.styles.section}>
                <View style={this.styles.sectionHalf}>
                    <Text>{this.state.viewTxt}</Text>
                    <Button onPress={() => this._clickBtn()} title={"Click"}></Button>
                </View>
                <View style={this.styles.section}>
                    {
                        (
                            Object.keys(this.state.myServerData).length == 0 
                                ? <Text>{"Loading..."}</Text> 
                                : <View>
                                        <Text style={{fontSize: 18, fontWeight:'bold', textAlign:'center', margin: 10}}>{"MyServer - RN"}</Text>
                                        <Text style={{padding:10}}>{`* Title : ${this.state.myServerData.title}`}</Text>
                                        <Text style={{padding:10}}>{`* Data : ${this.state.myServerData.data}`}</Text>
                                        <Text style={{padding:10}}>{`* Client : ${this.state.myServerData.client}`}</Text>
                                </View>
                        )
                    }
                </View>
                <View style={this.styles.section}>
                    {
                        (
                            this.state.docServerData.length === 0
                                ? <Text>{"Lodding..."}</Text>
                                : this.FlatListExample()
                        )
                    }
                </View>
            </View>
        );
    }

    FlatListExample(){
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize: 18, fontWeight:'bold', textAlign:'center', margin: 10}}>{"DocExamServer - RN"}</Text>
                <FlatList 
                    data={this.state.docServerData}
                    keyExtractor={ item => item.id}
                    renderItem={ ({item}) => (
                        <TouchableOpacity onPress={e => console.log(item.id, item.title)} >
                            <View style={{flex:1, flexDirection:'row', padding:10, margin:10, backgroundColor:'#eefedd'}}>
                                <View style={{flex:1}}><Text style={{textAlign:'center'}}>{item.id}</Text></View>
                                <View style={{flex:1}}><Text style={{textAlign:'left'}}>{item.title}</Text></View>
                                <View style={{flex:1}}>
                                    <Text style={{textAlign:'center'}}>{item.releaseYear}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
      }

    _clickBtn(){
        this.setState({
            viewTxt: this.state.viewTxt+=1
        });
        return;
    }

    styles = StyleSheet.create({
        section: {
            display: 'flex',
            flex: 2,
            padding: 20, 
            margin:10, 
            borderColor: 'red', 
            borderWidth:2, 
        },
        sectionHalf: {
            display: 'flex',
            flex: 1
        },
    })
}

export default MainPage;

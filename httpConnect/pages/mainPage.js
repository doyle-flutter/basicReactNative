import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {ExamModel, MyServerDataModel} from '../models/examModel.js';

class MainPage extends Component{

    constructor(props){
        super(props);
        this.state = {viewTxt : ''};
        fetch('http://127.0.0.1:3000/data/all')
            .then((response) => response.json())
            .then((json) => MyServerDataModel.fromJson(json))
            .then((result) => {
                console.log('1. constructor : ');
                console.log(result);
                return;
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
                return;
            });
    }
    
    render(){
        return (
            <View>
                <Text>{this.state.viewTxt}</Text>
                <Button onPress={() => this._clickBtn()} title={"Click"}></Button>
            </View>
        );
    }
    _clickBtn(){
        this.setState({
            viewTxt: this.state.viewTxt+=1
        });
        return;
    }
}

export default MainPage;

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

class MainPage extends Component{

    // LifeCycle 
    componentWillMount(){
        this.setState({
            viewTxt : '안녕하세요'
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

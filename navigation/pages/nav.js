import React, {Component} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';

class Nav extends Component{

    constructor({props}){
        super(props);
    }
    
    render(){
        return (
            <View>
                <Text>{this.props.extraData}</Text>
                <Button
                    title="Go to Page2"
                    onPress={() => this.props.navigation.push('Page2')}
                />
            </View>
        );
    }
    
}

export default Nav;

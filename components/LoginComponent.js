import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';       // import everything from that module

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        };
    }

    static navigationOptions = {
        title: 'Login'
    }

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {                                                                                                      // if 'remember me' checkbox is checked
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))            // save data to storage (1st arg: key='userinfo', 2nd arg: value='username & password' converted to a string)
                .catch(error => console.log('Could not save user info', error));                                                           // Secure store returns a promise if there's an error (in this case, logging to a console)
        } else {                                                                    // if 'remember me' checkbox is not checked, 
            SecureStore.deleteItemAsync('userinfo')                                     // delete any data that's in the secure store
                .catch(error => console.log('Could not delete user info', error));      // Returns a promise if there's any error deleting it
        }
    }

    // Ensure user info is retrieved from Secure store when the component mounts
    componentDidMount() {
        SecureStore.getItemAsync('userinfo')                // when the form was submitted last time, checks for any data saved under (1st arg: key='userinfo') 
            .then(userdata => {                                 // Returns a promise 
                const userinfo = JSON.parse(userdata);              // change 'userdata' to a js object using JSON.parse() and store to 'userinfo'
                if(userinfo) {                                      // checks if it's not a null and a truthy value then update the state
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true})
                }
            });
    }

    render() {
        return(
            <View style={styles.container}>
                <Input placeholder='Username'                               
                       leftIcon={{type: 'font-awesome', name: 'user-o'}}
                       onChangeText={username => this.setState({username})}     // change empty string into typed username
                       value={this.state.username}                              // controlled component always reflecting the state
                       containerStyle={styles.formInput}
                       leftIconContainerStyle={styles.formIcon}
                />
                <Input placeholder='Password'                               
                       leftIcon={{type: 'font-awesome', name: 'key'}}
                       onChangeText={password => this.setState({password})}     // change empty string into typed username
                       value={this.state.password}                              // controlled component always reflecting the state
                       containerStyle={styles.formInput}
                       leftIconContainerStyle={styles.formIcon}
                />
                <CheckBox title='Remember Me'
                          center
                          checked={this.state.remember}
                          onPress={() => this.setState({remember: !this.state.remember})}       // will change the state to true
                          containerStyle={styles.formCheckBox}
                />
                <View style={styles.formButton}>
                    <Button onPress={() => this.handleLogin()}
                            title='Login'
                            color='#5637DD'
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 10
    },
    forCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 40
    }
});

export default Login;
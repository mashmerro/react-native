import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';       // import everything from that module
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { baseUrl } from '../shared/baseUrl';

class LoginTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        };
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({tintColor}) => (
            <Icon name='sign-in'
                type='font-awesome'
                iconStyle={{color: tintColor}}
            />
        )
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
                          onPress={() => this.setState({remember: !this.state.remember})}   // will change the state to true
                          containerStyle={styles.formCheckBox}
                />
                <View style={styles.formButton}>    
                    <Button onPress={() => this.handleLogin()}                              // login button
                            title='Login'
                            icon={<Icon name='sign-in'
                                        type='font-awesome'
                                        color='#fff'
                                        iconStyle={{marginRight: 10}}
                                /> 
                            }
                            buttonStyle={{backgroundColor:'#5637DD'}}
                    />
                </View>
                <View style={styles.formButton}>                
                    <Button onPress={() => this.props.navigation.navigate('Register')}     // register button
                            title='Register'
                            type='clear'        // transparent button without background color
                            icon={
                                <Icon name='user-plus'
                                        type='font-awesome'
                                        color='blue'
                                        iconStyle={{marginRight: 10}}
                                /> 
                            }
                            titleStyle={{color: 'blue'}}
                    />
                </View>
            </View>
        );
    }
}

class RegisterTab extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        };
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({tintColor}) => (
            <Icon name='user-plus'
                type='font-awesome'
                iconStyle={{color: tintColor}}
            />
        )
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);                    // ask device permission to use camera
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);           // ask device permission to use camera gallery

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            const capturedImage = await ImagePicker.launchCameraAsync({                             // hold local file path of captured image
                allowsEditing: true,     // editor after taking photo
                aspect: [1, 1]           // square cropped image
            });
            if (!capturedImage.cancelled) {                     // check for if image picking process was not cancelled and went through
                console.log(capturedImage);
                this.setState({imageUrl: capturedImage.uri})    // store it in the server
            }
        }
    }

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {                                                                                                      // if 'remember me' checkbox is checked
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))            // save data to storage (1st arg: key='userinfo', 2nd arg: value='username & password' converted to a string)
                .catch(error => console.log('Could not save user info', error));                                                           // Secure store returns a promise if there's an error (in this case, logging to a console)
        } else {                                                                    // if 'remember me' checkbox is not checked, 
            SecureStore.deleteItemAsync('userinfo')                                     // delete any data that's in the secure store
                .catch(error => console.log('Could not delete user info', error));      // Returns a promise if there's any error deleting it
        }
    }

    render() {
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image source={{uri: this.state.imageUrl}}                      // source from server
                               loadingIndicatorSource={require('./images/logo.png')}    // loading while waiting for the image to retrieve
                               style={styles.image}                                      // profile photo (initialized to nucamp photo then replaced when user uploads their own)
                        />
                        <Button title='Camera'
                                onPress={this.getImageFromCamera}       // notice: event handler is not an arrow function/ takes args. When writing the method, bind it/ arrow function
                        />
                    </View>
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
                    <Input placeholder='First Name'                               
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={firstname => this.setState({firstname})}     // change empty string into typed username
                        value={this.state.firstname}                              // controlled component always reflecting the state
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input placeholder='Last Name'                               
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={lastname => this.setState({lastname})}     // change empty string into typed username
                        value={this.state.lastname}                              // controlled component always reflecting the state
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input placeholder='Email'                               
                        leftIcon={{type: 'font-awesome', name: 'envelope-o'}}
                        onChangeText={email => this.setState({email})}     // change empty string into typed username
                        value={this.state.email}                              // controlled component always reflecting the state
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <CheckBox title='Remember Me'
                            center
                            checked={this.state.remember}
                            onPress={() => this.setState({remember: !this.state.remember})}   // will change the state to true
                            containerStyle={styles.formCheckBox}
                    />
                    <View style={styles.formButton}>    
                        <Button onPress={() => this.handleRegister()}                              // login button
                                title='Register'
                                icon={
                                    <Icon name='user-plus'
                                            type='font-awesome'
                                            color='#fff'
                                            iconStyle={{marginRight: 10}}
                                    /> 
                                }
                                buttonStyle={{backgroundColor:'#5637DD'}}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const Login = createBottomTabNavigator(
    {
        Login: LoginTab,
        Register: RegisterTab
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#5637DD',
            inactiveBackgroundColor: '#CEC8FF',
            activeTintColor: '#fff',
            inactiveTintColor: '#808080',
            labelStyle: {fontSize: 16}
        }
    }
);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 10
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 8
    },
    forCheckbox: {
        margin: 8,
        backgroundColor: null
    },
    formButton: {
        margin: 20,
        marginRight: 40,
        marginLeft: 40
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10
    },
    image: {
        width: 60,
        height: 60
    }
});

export default Login;

// Downloaded components from react library
import React, { Component } from 'react';                       // enables use of component from react
import { View, Platform } from 'react-native';                  // container to wrap UI elements (= <div>)
import { createStackNavigator } from 'react-navigation-stack';  // enables use of view stack when navigating between screens
import { createAppContainer } from 'react-navigation';          // handles top-level navigator
import { createDrawerNavigator } from 'react-navigation-drawer';
import Constants from 'expo-constants';
// Custom Components we made
import Directory from './DirectoryComponent';       // enables use of Directory component.js
import CampsiteInfo from './CampsiteInfoComponent'; // enables use of Campsite info component.js
import Home from './HomeComponent';

// 'createStackNavigator': function that has 1 required arg (Route Configs obj)
const DirectoryNavigator = createStackNavigator (   
    {  // Required arg: Components available for view stack in Directory
        Directory: { screen: Directory },
        CampsiteInfo: { screen: CampsiteInfo }
    },
    {  // Optional arg: Additional configuration
        initialRouteName: 'Directory',  // when navigator opened, default to showing Directory
        defaultNavigationOptions: {     // header css styles
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const HomeNavigator = createStackNavigator(
    {  // Required arg: Components available for view stack in Home
        Home: { screen: Home }
    },
    {  // Optional arg: Additional configuration
        defaultNavigationOptions: {     // header css styles
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator },
        Directory: { screen: DirectoryNavigator }
    },
    {
        drawerBackgroundColor: '#CEC8FF'
    }
)

// 'createAppcContainer' : function that returns React component handling top-level navigator (must do) to React Native app (ie: responding to back button)
const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {    

    render() {
       return ( // Note: ios & android can show 2 diff styles. 'Platform.OS === ios' : if the 'Platform' (downloaded) OS is ios then put the padding to 0. Else, use the Constants (downloaded) auto height
           <View style={{flex: 1,
                        paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
                       }}
            >
               <AppNavigator/>
           </View>
       );
    }
}
/**  OLD APPROACH:
  return (           
            <View style={{flex: 1}}>
                <Directory 
                    campsites={this.state.campsites} 
                    onPress={campsiteId => this.onCampsiteSelect(campsiteId)} 
                />
                <CampsiteInfo campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]} />  
            </View>
             /* Render returns only NEEDS ONE parent wrapper (<View> or <div>)
                --> <Directory> 'campsites' : pass entire state of campsites array to Directory
                                'onPress'   : pass the event handler method when clicking a campsite through its id to be triggered from Directory
                --> <CampsiteInfo> pass the entire campsite object (image, descr, etc)
                                since 'selectedCampsite' prop only has campsite id, take the whole campsites array then filter it with 1 campsite at a time through id
            
        ); 
**/
export default Main;    // import Main to other components
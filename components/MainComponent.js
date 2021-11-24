
// Downloaded components from react library
import React, { Component } from 'react';                       // enables use of component from react
import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native';      // container to wrap UI elements (= <div>)
import { Icon } from 'react-native-elements';
//  --> React Navigation
import { createStackNavigator } from 'react-navigation-stack';  // enables use of view stack when navigating between screens
import { createAppContainer } from 'react-navigation';          // handles top-level navigator
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import Constants from 'expo-constants';
import SafeAreaView from 'react-native-safe-area-view';         // specifically for iphone x
// --> React Redux
import { connect } from 'react-redux';              // connects state from redux
import { fetchCampsites, fetchComments, fetchPromotions, fetchPartners } from '../redux/ActionCreators';    // Custom Action creators we made
// Custom Components we made 
import Directory from './DirectoryComponent';       // enables use of Directory component.js
import CampsiteInfo from './CampsiteInfoComponent'; // enables use of Campsite info component.js
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoritesComponent';

const mapDispatchToProps = {    // Dispatch actions that have been thunked for asynchronous calls fetch to/ from server
    fetchCampsites,
    fetchComments,
    fetchPromotions,
    fetchPartners
};

const HomeNavigator = createStackNavigator(
    {  // Required arg: Components available for view stack in Home
        Home: { screen: Home }
    },
    {  // Optional arg: Additional configuration
        defaultNavigationOptions: ({navigation}) => ({     // header css styles: wrap the object literal with() so the arrow function knows it's an object literal and not a function body
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon name='home'
                              type='font-awesome'
                              iconStyle={styles.stackIcon}
                              onPress={() => navigation.toggleDrawer()}
                        />
        })
    }
);

// 'createStackNavigator': function that has 1 required arg (Route Configs obj)
const DirectoryNavigator = createStackNavigator (   
    {  // Required arg: Components available for view stack in Directory (Directory > CanpsiteInfo)
        Directory: { 
            screen: Directory,
            navigationOptions: ({navigation}) => ({                         // 'navigationOption': optional arg for 'Directory screen' (not CampsiteInfo)
                headerLeft: <Icon name='list'                                 // icon name 
                                  type='font-awesome'                         // icon library
                                  iconStyle={styles.stackIcon}                // 'styles' : name of function we created, '.stackIcon' : passed in styles
                                  onPress={() => navigation.toggleDrawer()}   // interactive when pressed (to toggle the side drawer)
                            />
            })
        },
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

const AboutNavigator = createStackNavigator (
    {
        About: { screen: About }
    },
    {  // Optional arg: Additional configuration
        defaultNavigationOptions: ({navigation}) => ({     // header css styles
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon name='info-circle'
                              type='font-awesome'
                              iconStyle={styles.stackIcon}
                              onPress={() => navigation.toggleDrawer()}
                        />
        })
    }
);

const ContactNavigator = createStackNavigator (
    {
        Contact: { screen: Contact }
    },
    {  // Optional arg: Additional configuration
        defaultNavigationOptions: ({navigation}) => ({     // header css styles 
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon name='address-card'
                              type='font-awesome'
                              iconStyle={styles.stackIcon}
                              onPress={() => navigation.toggleDrawer()}
                        />
        })
    }
);

const ReservationNavigator = createStackNavigator (
    {
        Reservation: { screen: Reservation }
    },
    {  // Optional arg: Additional configuration
        defaultNavigationOptions: ({navigation}) => ({     // header css styles 
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon name='tree'
                              type='font-awesome'
                              iconStyle={styles.stackIcon}
                              onPress={() => navigation.toggleDrawer()}
                        />
        })
    }
);

const FavoritesNavigator = createStackNavigator (
    {
        Favorites: { screen: Favorites }
    },
    {  // Optional arg: Additional configuration
        defaultNavigationOptions: ({navigation}) => ({     // header css styles 
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon name='heart'
                              type='font-awesome'
                              iconStyle={styles.stackIcon}
                              onPress={() => navigation.toggleDrawer()}
                        />
        })
    }
);

const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView style={styles.container}
                      forceInset={{top: 'always', horizontal: 'never'}}>  
            <View style={styles.drawerHeader}>
                <View style={styles.drawerHeader}>
                    <View style={{flex: 1}}>
                        <Image source={require('./images/logo.png')}
                               style={styles.drawerImage}/>     
                    </View>   
                    <View style={{flex: 2}}>
                        <Text style={styles.drawerHeaderText}>NuCamp</Text>
                    </View>     
                </View>                       
            </View>
            <DrawerItems {...props} />      
        </SafeAreaView>
    </ScrollView>
);
// <SafeAreaView> for iphone x defines part of an area that nothing else will be laid out (rounded corners and camera notch)

// Drawer navigator: must be in order
const MainNavigator = createDrawerNavigator(
    {
        Home: { 
            screen: HomeNavigator, 
            navigationOptions: {                    // home icon
                drawerIcon: ({tintColor}) => (
                    <Icon name='home'
                          type='font-awesome'
                          size={24}
                          color={tintColor}
                    />
                )
            }
        },
        Directory: { 
            screen: DirectoryNavigator, 
            navigationOptions: {                    // directory icon
                drawerIcon: ({tintColor}) => (
                    <Icon name='list'
                          type='font-awesome'
                          size={24}
                          color={tintColor}
                    />
                )
            }
        },
        Reservation: { 
            screen: ReservationNavigator, 
            navigationOptions: {                    // reservation icon
                drawerLabel: 'Reserve Campsite',
                drawerIcon: ({tintColor}) => (
                    <Icon name='tree'
                          type='font-awesome'
                          size={24}
                          color={tintColor}
                    />
                )
            }
        },
        Favorites: { 
            screen: FavoritesNavigator, 
            navigationOptions: {                    // reservation icon
                drawerLabel: 'My Favorites',
                drawerIcon: ({tintColor}) => (
                    <Icon name='heart'
                          type='font-awesome'
                          size={24}
                          color={tintColor}
                    />
                )
            }
        },
        About: { 
            screen: AboutNavigator,
            navigationOptions: {                    // about icon
                drawerLabel: 'About Us',
                drawerIcon: ({tintColor}) => (
                    <Icon name='info-circle'
                          type='font-awesome'
                          size={24}
                          color={tintColor}
                    />
                )
            } 
        },
        Contact: { 
            screen: ContactNavigator,
            navigationOptions: {                    // contact icon
                drawerLabel: 'Contact Us',
                drawerIcon: ({tintColor}) => (
                    <Icon name='address-card'
                          type='font-awesome'
                          size={24}
                          color={tintColor}
                    />
                )
            } 
        }
    },
    {
        drawerBackgroundColor: '#CEC8FF',
        contentComponent: CustomDrawerContentComponent
    }
)

// 'createAppcContainer' : function that returns React component handling top-level navigator (must do) to React Native app (ie: responding to back button)
const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {

    // 'componentDidMount'  : built-in lifecycle method function to call Action creators
    componentDidMount() {       
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();
    }

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

// Custom styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#5637DD',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
});

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
export default connect(null, mapDispatchToProps)(Main);    // import Main to other components
/*
connect(mapStateToProps) : first arg for connect but since we don't have it here, it is set to "null"
*/
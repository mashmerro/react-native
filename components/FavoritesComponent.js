import React, { Component } from 'react';
// Downloaded Dependencies
import { FlatList, View, Text, StyleSheet, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';  // Much easier to use this library than import { Animated } from 'react-native';
// Redux
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
// Swipe tools
import { SwipeRow } from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { deleteFavorite } from '../redux/ActionCreators';

// Fetch campsites and favorites data from the state
const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        favorites: state.favorites
    };
};

// Dispatch actions that have been thunked for asynchronous calls fetch to/ from server
const mapDispatchToProps = { 
    deleteFavorite: campsiteId => deleteFavorite(campsiteId)
};

class Favorites extends Component {
    // Stack navigator
    static navigationOptions = {
        title: 'My Favorites'   // header name
    }

    render() {
        // Make every favorite clickable and route to corresponding campsite info component
        const { navigate } = this.props.navigation;   
        const renderFavoriteItem = ({item}) => {    // De-structure current item from the array
            return (
                <SwipeRow rightOpenValue={-100} style={styles.swipeRow}>
                    <View style={styles.deleteView}>
                        <TouchableOpacity style={styles.deleteTouchable}
                                          onPress={() => Alert.alert('Delete Favorite?', 
                                                                     'Are you sure you sure you wish to delete the favorite campsite ' + item.name + '?',
                                                                     [
                                                                         {
                                                                             text: 'Cancel',
                                                                             onPress: () => console.log(item.name + 'Not Deleted'),
                                                                             style: 'cancel'
                                                                         },
                                                                         {
                                                                             text: 'OK',
                                                                             onPress: () => this.props.deleteFavorite(item.id)
                                                                         },
                                                                     ],
                                                                     { cancelable: false }
                                                                    )
                                                 } 
                        // -> <TouchableOpacity> : wrapper for touches to dim when pressing
                        //      -> .alert : (first param- title | second param- short message on dialogue box | third param: actions through an object like buttons | fourth param: optional)
                        >
                            <Text style={styles.deleteText}>Delete</Text> 
                        </TouchableOpacity>
                    </View>
                    <View>
                        <ListItem title={item.name}
                                  subtitle={item.description}
                                  leftAvatar={{source: {uri: baseUrl + item.image}}}
                                  onPress={() => navigate('CampsiteInfo', {campsiteId: item.id})}
                        />  
                    </View>
                </SwipeRow>
            );  /* 
                    onPress: turn to link to navigate route campsite info screen
                    <SwipeRow> : component that can be swiped
                        --> rightOpenValue : opens from the right side with negative int
                        --> first <View> : hidden view with extra options when you swipe
                        --> second <View> : default view before you swipe
                */
        };

        // Check if we're still loading campsites data
        if (this.props.campsites.isLoading) {
            return <Loading />;
        }
        // Check if there's an error 
        if (this.props.campsites.errMess) {
            return (
                <View>
                    <Text>{this.props.campsites.errMess}</Text>
                </View>
            );
        }
        return(
            <Animatable.View animation='fadeInRightBig' duration={2000}>
                <FlatList data={this.props.campsites.campsites.filter(campsite => this.props.favorites.includes(campsite.id))}
                        renderItem={renderFavoriteItem}
                        keyExtractor={item => item.id.toString()}
                />
            </Animatable.View>
        );
        /*
            Flatlist will generate:
                --> data containing array of campsites: filter out campsites with id that's matching in the list of favorites
                --> renderItem
                --> keyExtractor: pass item to function and extract the id from it as a string
        */
    }
}

const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    deleteTouchable: {
        backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center'
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
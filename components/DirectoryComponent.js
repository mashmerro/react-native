import React, { Component } from 'react';
// Downloaded dependencies
import { View, Text, FlatList } from 'react-native';    // View = <div class='container'>   ; FlatList = <ul>
import { Tile } from 'react-native-elements';           // ListItem / Tile = <li>
import * as Animatable from 'react-native-animatable';  // Much easier to use this library than import { Animated } from 'react-native';
// Redux
import { connect } from 'react-redux';          // connects state from redux 
import { baseUrl } from '../shared/baseUrl';    // json-server
import Loading from './LoadingComponent';       // loading icon when getting from the server/ refreshing

const mapStateToProps = state => {
    return {
        campsites: state.campsites
    };
};

class Directory extends Component {

    // Configure text for header title using 'static'
    static navigationOptions = {
        title: 'Directory'
    };

    render() {

        const { navigate } = this.props.navigation; // Each 'screen' from Main gets 'navigation prop' destructed from 'navigate'

        /* renderDirectoryItem will render each item in the list
            --> 'item' is an object passed by default from FlatList. 
                De-structure it with {} to give its properties (title, subtitle, leftAvatar) new values
        */
        const renderDirectoryItem = ({item}) => {
            return(
                <Animatable.View animation='fadeInRightBig' duration={2000}>
                    <Tile title={item.name}
                        caption={item.description}
                        featured
                        onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })}
                        imageSrc={{uri: baseUrl + item.image}}
                    />
                </Animatable.View>
            );
            /* Each list item will have:
                --> 'title': campsite's title
                --> 'subtitle' or 'caption' : campsite's description
                --> 'featured' changes appearance of Tile
                --> 'onPress' built in from "ListItem" or "Tile"
                --> 'leftAvatar' {JSX {requires an object}}: "source" as object property ; "require" as the value (from node.js) and image we want to use
                --> 'imageSrc' same as leftAvatar, grabbing from the server's image
            */
        };

        // If campsites are loading, show call loading comp
        if (this.props.campsites.isLoading) {
            return <Loading />;
        }

        // If campsites have errors, show error message
        if (this.props.campsites.errMess) {
            return (
                <View>
                    <Text>{this.props.campsites.errMess}</Text>
                </View>
            );
        }

        return (
            /* Pass FlatList props:
                --> 'data' (required) will always be an array: will hold campsites array
                --> 'renderItem' (required) will always render data to a list: will hold the callback function 'renderDirectoryItem'
                --> 'keyExtractor' will hold each property key (or id) each item from campsites array then convert from # to string
            */
            <FlatList data={this.props.campsites.campsites}
                      renderItem={renderDirectoryItem}
                      keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps)(Directory);
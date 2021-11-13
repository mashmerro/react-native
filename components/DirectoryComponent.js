import React, { Component } from 'react';
// Downloaded dependencies
import { FlatList } from 'react-native';            // FlatList = <ul>
import { ListItem } from 'react-native-elements';   // ListItem = <li>
import { CAMPSITES } from '../shared/campsites';

class Directory extends Component {
    constructor (props) {
        super(props);
        this.state = {
            campsites: CAMPSITES
        };
    }

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
            
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })}
                    leftAvatar={{ source: require('./images/react-lake.jpg')}}
                />
            )
            /* Each list item will have:
                --> 'title': campsite's title
                --> 'subtitle': campsite's description
                --> 'onPress' built in from "ListItem" : 
                --> 'leftAvatar' {JSX {requires an object}}: "source" as object property ; "require" as the value (from node.js) and image we want to use
            */
        };

        return (
            /* Pass FlatList props:
                --> 'data' (required) will always be an array: will hold campsites array
                --> 'renderItem' (required) will always render data to a list: will hold the callback function 'renderDirectoryItem'
                --> 'keyExtractor' will hold each property key (or id) each item from campsites array then convert from # to string
            */
            <FlatList 
                data={this.state.campsites}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default Directory;
import React from 'react';
// Downloaded dependencies
import { FlatList } from 'react-native';            // FlatList = <ul>
import { ListItem } from 'react-native-elements';  // ListItem = <li>

function Directory(props) {

    /* renderDirectoryItem will render each item in the list
        --> 'item' is an object passed by default from FlatList. 
            De-structure it with {} to give its properties (title, subtitle, leftAvatar) new values
    */
    const renderDirectoryItem = ({item}) => {
        /* Each list item will have:
            --> 'title': campsite's title
            --> 'subtitle': campsite's description
            --> 'leftAvatar' {JSX {requires an object}}: "source" as object property ; "require" as the value (from node.js) and image we want to use
        */
        return (
            <ListItem
                title={item.name}
                subtitle={item.description}
                leftAvatar={{ source: require('./images/react-lake.jpg')}}
            />
        )
    };

    return (
        /* Pass FlatList props:
            --> 'data' (required) will always be an array: will hold campsites array
            --> 'renderItem' (required) will always render data to a list: will hold the callback function 'renderDirectoryItem'
            --> 'keyExtractor' will hold each property key (or id) each item from campsites array then convert from # to string
        */
        <FlatList 
            data={props.campsites}
            renderItem={renderDirectoryItem}
            keyExtractor={item => item.id.toString()}
        />
    );
}

export default Directory;
// Components we downloaded from react library
import React, { Component } from 'react';           // enables use of component from react
import { View } from 'react-native';                // container to wrap UI elements (= <div>)
// Custom Components we made
import Directory from './DirectoryComponent';       // enables use of Directory component.js
import CampsiteInfo from './CampsiteInfoComponent'; // enables use of Campsite info component.js
// Array scripts 
import { CAMPSITES } from '../shared/campsites';    // get the campsites array from campsites.js

class Main extends Component {
    constructor(props) {    // 'props' passed in different components
        super(props);
        this.state = {      
            campsites: CAMPSITES,       // holds campsite array
            selectedCampsite: null      // keeps track on which campsite has been selected (initialize to nothing first)
        };
    }

    onCampsiteSelect(campsiteId) {      // Event handler when clicking a campsite 
        this.setState({selectedCampsite: campsiteId});          // 'this.setState' when updating the state outside, set the "selectedCampsite" to a campsite id
    }

    render() {
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
            */
        );
    }
}

export default Main;    // import Main to other components
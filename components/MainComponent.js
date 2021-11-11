import React, { Component } from 'react';           // enables use of component from react
import Directory from './DirectoryComponent';       // enables use of Directory component.js
import { CAMPSITES } from '../shared/campsites';    // get the campsites array from campsites.js

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES
        }
    }

    render() {
        return <Directory campsites={this.state.campsites} />;  // pass entire state of campsites array to Directory
        
    }
}

export default Main;    // import Main to other components
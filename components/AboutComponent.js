import React, { Component } from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';  // Much easier to use this library than import { Animated } from 'react-native';
import { connect } from 'react-redux';                  // connects state from redux
import { baseUrl } from '../shared/baseUrl';            // json-server
import Loading from './LoadingComponent';               // loading icon when getting from the server/ refreshing

const mapStateToProps = state => {                      // receive state as a prop, returns partners from state
    return {
        partners: state.partners
    };
};

function Mission() {
    return(
        <Card title="Our Mission">
            <Text style={{margin: 10}}>
                We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. 
                We increase access to adventure for the public while promoting safe and respectful use of resources. 
                The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. 
                We also present a platform for campers to share reviews on campsites they have visited with each other.
            </Text>
        </Card>
    );
}

class About extends Component {

    static navigationOptions = {
        title: 'About Us'
    };

    render() {
        const renderPartner = ({item}) => {
            return(
                <ListItem title={item.name}
                          subtitle={item.description}
                          leftAvatar={{source: {uri: baseUrl + item.image}}}
                />  // 'source' : use campsite images from the server
            );
        };

        // If partners are loading, show call loading comp
        if (this.props.partners.isLoading) {
            return (
                <ScrollView>
                    <Mission />
                    <Card title="Community Partners">
                        <Loading />
                    </Card>
                </ScrollView>
            )
        }

        // If partners have errors, show error message
        if (this.props.partners.errMess) {
            return (
                <ScrollView>
                    <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                        <Mission />
                        <Card title="Community Partners">
                            <Text>{this.props.partners.errMess}</Text>
                        </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }

        return(
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <Mission />
                    <Card title="Community Partners">
                        <FlatList data={this.props.partners.partners}     // this.props.partners = entire partners data (isLoading, errMess, partners) ; .partners = prop of this.props.partners
                                renderItem={renderPartner}
                                keyExtractor={item => item.id.toString()}
                        />
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(About);                     // connect to redux store, About component receives partners props from redux store
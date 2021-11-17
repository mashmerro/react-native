import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        promotions: state.promotions,
        partners: state.partners
    };
};

function RenderItem(props) {    // props is args instead of {item} because of isLoading and errMess
    const {item} = props;       // de-structuring item property

    if (props.isLoading) {
        return <Loading />;
    }

    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }

    if (item) {
        return (
            <Card
                featuredTitle={item.name}
                image={{uri: baseUrl + item.image}}>
                <Text style={{margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    }

    render() {  // Shows 3 cards in Home screen 
        return(
            <ScrollView>
                <RenderItem item={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                            isLoading={this.props.campsites.isLoading}
                            errMess={this.props.campsites.errMess}
                />
                <RenderItem item={this.props.promotions.promotions.filter(promotions => promotions.featured)[0]} 
                            isLoading={this.props.promotions.isLoading}
                            errMess={this.props.promotions.errMess}
                />
                <RenderItem item={this.props.partners.partners.filter(partners => partners.featured)[0]} 
                            isLoading={this.props.partners.isLoading}
                            errMess={this.props.partners.errMess}
                />
            </ScrollView>
        );
    }
}
/*
<ScrollView>: loads all child components at once
<FlatList>: part of a list is rendered at a time to improve performance for its longer lists
*/

export default connect(mapStateToProps)(Home);
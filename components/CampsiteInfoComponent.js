import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';                  // connects state from redux
import { baseUrl } from '../shared/baseUrl';            // json-server
import { postFavorite } from '../redux/ActionCreators'; // favoriting the campsite state

const mapStateToProps = state => {  // receive state as a prop
    return {
        campsites: state.campsites,
        comments: state.comments,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId))
};

function RenderCampsite(props) {   // De-structure campsite array
    const {campsite} = props;

    if (campsite) { // if campsite object has something
        return (
            <Card
                featuredTitle={campsite.name}
                image={{uri: baseUrl + campsite.image}}>
                <Text style={{margin:10}}>
                    {campsite.description}
                </Text>
                <Icon
                    name={props.favorite ? 'heart' : 'heart-o'}      // name of the icon: if props is true (favorite), icon is solid heart, else- not solid (not favorite)
                    type='font-awesome'     // where icon is from
                    color='#f50'
                    raised                  // subtle shadow effect
                    reverse                 // reverse color scheme
                    onPress={() => props.favorite ? 
                        console.log('Already set as a favorite') : props.markFavorite()}    // if already a favorite, it won't do anything but console.log
                />
            </Card>
        );
    }
    return <View />;    // if campsite doesn't have anything, return an empty View (= </div>)
}

// Show Card of comments description
function RenderComments({comments}) {   //De-structure comments array
    const renderCommentItem = ({item}) => {
        return(
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return(
        <Card title='Comments'>
            <FlatList
                data={comments}                             // data always takes an array 
                renderItem={renderCommentItem}              // calls renderCommentItem
                keyExtractor={item => item.id.toString()}   // extracts comments id from # to a string
            />
        </Card>
    );
}

class CampsiteInfo extends Component {

    markFavorite(campsiteId) {
        this.props.postFavorite(campsiteId);    // change state
    }

    static navigationOptions = {
        title: 'Campsite Information'
    }

    render() { 
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId);
        return (
            <ScrollView>
                <RenderCampsite campsite={campsite} 
                    favorite={this.props.favorites.includes(campsiteId)}
                    markFavorite={() => this.markFavorite(campsiteId)}
                />
                <RenderComments comments={comments} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);  // receive state arrays from redux store
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

// When refreshing page or getting info from server, this pops up first
function Loading() {
    return (
        <View style={styles.loadingView}>
            <ActivityIndicator size='large' color='#5637DD' />
            <Text style={styles.loadingText}>Loading . . .</Text>
        </View>
    );
    /*
        <View>  :   container to show UI
        <ActivityIndicator> : loading circle
    */
}

// Loading custom styles
const styles = StyleSheet.create(
    {
        loadingView: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
        },
        loadingText: {
            color: '#5637DD',
            fontSize: 14,
            fontWeight: 'bold'
        }
    }
)

export default Loading;
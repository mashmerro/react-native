import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';        // API for calendar date/time
import * as Animatable from 'react-native-animatable';  

/* Controlled form (will handle data by itself - same page) */
class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campers: 1,
            hikeIn: false,
            date: new Date(),
            showCalendar: false
        };
    }

    // Set up for stack navigator screen
    static navigationOptions = {
        title: 'Reserve Campsite'
    }

    // When form is submitted
    handleReservation() {
        console.log(JSON.stringify(this.state));    // echo state in console

        const title = 'Begin Search?';
        const message = `Number of Campers: ${this.state.campers}
                        \nHike In? ${this.state.hikeIn}
                        \nDate: ${this.state.date.toLocaleDateString('en-US')}`;
        const buttons = [
            {
                text: 'Cancel',
                onPress: () => console.log('Canceled')
            },
            {
                text: 'OK',
                onPress: () => this.resetForm()
            },
        ]
        const options = { cancelable: false }

        Alert.alert(title, message, buttons, options);
    }
    
    // Reset state back to initial values
    resetForm() {
        this.setState({
            campers: 1,
            hikeIn: false,
            date: new Date(),
            showCalendar: false
        });
    }

    render() {
        return (
            <ScrollView>
                <Animatable.View animation='zoomIn'
                                 duration={2000}
                                 delay={1000}
                >
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Campers</Text>
                        <Picker style={styles.formItem}
                                selectedValue={this.state.campers}
                                onValueChange={itemValue => this.setState({campers: itemValue})}
                        >
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Hike-In?</Text>
                        <Switch style={styles.formItem}
                                value={this.state.hikeIn}
                                trackColor={{true: '#5637DD', false: null}}
                                onValueChange={value => this.setState({hikeIn: value})}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date</Text>
                        <Button onPress={() => this.setState({showCalendar: !this.state.showCalendar})}
                                title={this.state.date.toLocaleDateString('en-US')}
                                color='#5637DD'
                                accessibilityLabel='Tap me to select a reservation date'
                        />
                    </View>
                    {this.state.showCalendar && (
                        <DateTimePicker style={styles.formItem}
                                        value={this.state.date}
                                        mode={'date'}
                                        display='default'
                                        onChange={(event, selectedDate) => {selectedDate && this.setState({date: selectedDate, showCalendar: false})}}
                        />
                    )}
                    <View style={styles.formRow}> 
                        <Button onPress={() => this.handleReservation()}
                                title='Search'
                                color='#5637DD'
                                accessibilityLabel='Tap me to search for available campsites to reserve'
                        />
                    </View>
                </Animatable.View>
                
            </ScrollView>
            /*  
                <Picker> = <option>/<select> for dropdown
                    --> 'onValueChange' : triggers when user picks from Picker.Item to update component's state
                    --> 'selectedValue' : updated to match current state/ selection to display
                <Picker.Item> = <li> 
                ***
                <Switch> for Yes / No input
                    --> 'onValueChange' : triggers when user changes value yes or no then update component's state
                ***
                <DateTimePicker> would not show/ evaluate if this.state.showCalendar is false
                    --> if the user cancels, 'selectedDate' will be undefined so set it as a conditional && when it's truthy
                ***
                <Button> when pressed, will show the calendar
                    --> 'accessibilityLabel' : for screen-readers
            */
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
});

export default Reservation;
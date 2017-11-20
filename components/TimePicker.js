// Reference/citation: customized using example on https://github.com/mmazzarolo/react-native-modal-datetime-picker

import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import styled from 'styled-components/native';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default class TimePicker extends Component {
    state = {
        isDateTimePickerVisible: false,
    };

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    handleDatePicked = (date) => {
      const currentTime = new Date();
      date.setDate(currentTime.getDate());
      date.setSeconds(0);
      this.props.handleTime(date, this.props.deck);
      this.hideDateTimePicker();
    };

    render() {
        return (
            <View style={{ flex: 1, height: 28, width: 28}}>
        <Button onPress={this.showDateTimePicker}>
          <ButtonText><Ionicons name='ios-clock-outline' size={30} color="#ff5104" /></ButtonText>
        </Button>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode="time"
          date={this.props.time}
          titleIOS="Pick a time"
        />
      </View>
        );
    }

}

const ButtonText = styled.Text `
  text-align: center;
`;

const Button = styled.TouchableOpacity`
  border-width: 1px;
  border-radius: 3px;
  border-color: #ccc;

`;
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { setLocalNotification, clearLocalNotification, getNotificationPermission } from '../utils/notifications';
import styled from 'styled-components/native';
import TimePicker from './TimePicker';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


class Notifications extends Component {

    componentDidMount = () => {
        this.getNotificationVals(this.props.screenProps.decks);
        getNotificationPermission().then((result) => {
            this.setState({ permissions: result });
        })
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.screenProps !== this.props.screenProps) {
            this.getNotificationVals(nextProps.screenProps.decks);

            getNotificationPermission().then((result) => {
                this.setState({ permissions: result });
            })
        }
    }

    state = {
        notifications: {},
        permissions: false
    }

    //set local state with values from props to be used for
    //controlled inputs
    getNotificationVals = (decks) => {
        let notifications = {};
        Object.keys(decks).forEach((item) => {
            notifications[decks[item].title] = {
                active: decks[item].notifications.active,
                time: new Date(decks[item].notifications.time)
            }
        });

        this.setState({ notifications });
    }

    //update local state and storage for each notification input
    setNotification = (deckName, value, date) => {
        var notifications = Object.assign({}, this.state.notifications);

        if (value != null) notifications[deckName].active = value;
        if (date != null) notifications[deckName].time = date;

        this.setState(notifications);
        setLocalNotification(notifications);
    }

    setTime = (time, deck) => {
        // this.setState({
        //     notifications: {
        //         ...this.state.notifications,
        //         [deck]: {
        //             ...this.state.notifications[deck],
        //             time
        //         }
        //     }
        // });
        this.setNotification(deck, null, time);
    }

    render() {
        return (
            <ScrollView>
            <Container>
	            <InnerContainer>
			      <H1>Notifications</H1>
			      <View>{ !this.state.permissions && (<Row><WarningIcon><FontAwesome name='warning' size={28} color="#ff5104"/></WarningIcon><WarningText>Unable to set notifications. You need to enable notifications for this app.</WarningText></Row>)}</View>
			      
			      {
			          Object.keys(this.props.screenProps.decks).map((item) => ( 
			          	<Row key={this.props.screenProps.decks[item].title}>
			          		<ToggleSwitch 
			          			onValueChange={(value) => (this.setNotification(this.props.screenProps.decks[item].title, value))}
			          			onTintColor={(this.state.permissions)? "#00ff00" : "#979797" }
			          			thumbTintColor={(this.state.permissions)? "#ffffff" : "#6e6e6e" }
			          			tintColor={(this.state.permissions)? "#ccc" : "#979797"}
			          			disabled={!this.state.permissions}
			          			value={ this.state.notifications[this.props.screenProps.decks[item].title] && this.state.notifications[this.props.screenProps.decks[item].title].active}
			          		/>
			          		<DeckName>
			          			<RegularText>
			          				{this.props.screenProps.decks[item].title}
			          			</RegularText>
			          		</DeckName>
			          		<Time>
				          		<RegularText>
					          		 { this.state.notifications[this.props.screenProps.decks[item].title] && this.state.notifications[this.props.screenProps.decks[item].title].time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} 
				          		</RegularText>
			          		</Time>

			          		
			          		<TimePicker handleTime={this.setTime} time={(this.state.notifications[this.props.screenProps.decks[item].title]) ? this.state.notifications[this.props.screenProps.decks[item].title].time : new Date()} deck={this.props.screenProps.decks[item].title}/>
			          	</Row>
			          ))
			      }
				</InnerContainer>
		      </Container>
		    </ScrollView>
        )
    }
}

const Container = styled.View `
	flex: 1;
	flex-direction: row;
	justify-content: center;
	padding: 20px;
`;

const InnerContainer = styled.View `
	flex: 1;
`;

const H1 = styled.Text `
	font-weight: bold;
	font-size: 20px;
	text-align: center;
	color: #383838;
	margin-bottom: 5px;
`;

const RegularText = styled.Text `
	font-size: 18px;
	color: #383838;
`;

const Row = styled.View `
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
	align-items: center
	margin-bottom: 10px;
	margin-top: 10px;
`;

const DeckName = styled.View `
	flex: 2;
`;
const Time = styled.View `
	flex: 2;
`;

const ToggleSwitch = styled.Switch `
	flex: 1;
	padding-right: 10px;
`;

const WarningIcon = styled.View `
	width: 15%;
	flex-direction: row;
	justify-content: center;
`;
const WarningText = styled.Text `
	width: 85%;
	font-size: 16px;
	font-weight: bold;
`;

const Button = styled.TouchableHighlight `
	margin: 10px;
	border-width: 1px;
	border-radius: 5px;
	border-color: #ccc;
	paddingTop: 10px;
	paddingBottom: 10px;
`;

const CeterText = styled.Text `
	text-align: center;
`;

export default Notifications;
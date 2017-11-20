import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';
import { updateAllNotifications, getAllDecks } from './storage';

const NOTIFICATION_KEY = 'Flashcards:notifications'

export function clearLocalNotification() {
    Notifications.cancelAllScheduledNotificationsAsync();
}

//
function createNotification(title) {
    return {
        title: `${title}: Study time!`,
        body: `📖 Don't forget to study ${title} today`,
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

//Get permissions and store result in local storage
export function getNotificationPermission() {
    return Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(status));
          return (status === 'granted');
        });
}

export function setLocalNotification(notifications) {

  //update notification details in local storage
  updateAllNotifications(notifications)

  //check permissions and update notifications
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((status) => {

            if (status === 'granted') {

                //clear all notifications
                Notifications.cancelAllScheduledNotificationsAsync()

                //Set notifications for all decks
                Object.keys(notifications).forEach((item) => {

                    //If notification is active set notification
                    if (notifications[item].active) {
                        const currentTime = new Date();
                        const date = notifications[item].time

                        //if time already passed update to tomorrow's date
                        if (date.getTime() < currentTime.getTime()) {
                            date.setDate(currentTime.getDate() + 1);
                        } 
                        console.log(date)
                        Notifications.scheduleLocalNotificationAsync(
                            createNotification(item), {
                                time: date,
                                repeat: 'day',
                            });
                    }
                });
            }
        })
}


//Clear notifications for today if they already studied and set for tomorrow
export function clearTodaysNotifications(deck) {
  //Get deck info from local storage
  let allDecks; 
  getAllDecks().then((decks) => {
    allDecks = decks;
    
    //check permissions and update notifications
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((status) => {

              if (status === 'granted') {

                  //clear all notifications
                  Notifications.cancelAllScheduledNotificationsAsync()

                  //object used for storing notification data in local storage
                  let notifications = {};

                  //Set notifications for all decks
                  Object.keys(allDecks).forEach((item) => {
                      notifications[item] = allDecks[item].notifications;

                      //If notification is active set notification
                      if (allDecks[item].notifications.active) {
                          const currentTime = new Date();
                          const date = new Date(allDecks[item].notifications.time);

                          //if date already passed or if if quiz started set to tomorrow's date
                          if (date.getTime() < currentTime.getTime() || allDecks[item].title === deck) {
                              date.setDate(currentTime.getDate() + 1);
                          } 

                          //update notification object to post to local storage
                          notifications[item].time = date;

                          Notifications.scheduleLocalNotificationAsync(
                              createNotification(item), {
                                  time: date,
                                  repeat: 'day',
                              });
                      }
                  });

                //update notification details in local storage
                updateAllNotifications(notifications)
              }
          })
    });
}
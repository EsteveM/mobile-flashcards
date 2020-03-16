// LOCAL NOTIFICATIONS - We create a notification key

import { AsyncStorage } from 'react-native'

import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

const NOTIFICATION_KEY = 'FlashCards:notifications'

// LOCAL NOTIFICATIONS - Let's do three different methods

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      // when this is finished we can Notifications.cancelAllScheduledNotificationsAsync() to
      // cancel all notifications 
      .then(Notifications.cancelAllScheduledNotificationsAsync())
  }
  
export function createNotification () {
// we create an object which represents the notification
return {
        title: 'Take your quiz!',
        body: "👋 don't forget to take your quiz for today!",
        ios: {
        // we want to make a sound
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            // we don't want to stay
            sticky: false,
            vibrate: true,
        }
    }
}
// we're going to use AsyncStorage to check if our NOTIFICATION_KEY has already been set
export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            // if we haven't set up a local notification (data === null), then we want to ask the 
            // notifications permission
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                // when we get back, whatever they said, that's going to come in as the status
                .then(({ status }) => {
                    if (status === 'granted') {
                        // if we already established a notification, go ahead and cancel that
                        Notifications.cancelAllScheduledNotificationsAsync()

                        // we want to get a time tomorrow at let's say 8 o'clock
                        let tomorrow = new Date()
                        tomorrow.setDate(tomorrow.getDate() + 1)
                        tomorrow.setHours(20)
                        tomorrow.setMinutes(0)

                        Notifications.scheduleLocalNotificationAsync(
                            // we will get back the object that createNotification creates
                            // (see function above)
                            createNotification(),
                            // now, some options
                            {
                            // the time we want it to run
                            time: tomorrow,
                            // repeat daily
                            repeat: 'day'
                            }
                        )

                        // we want to make sure that we establish inside of AsyncStorage that we have
                        // set up this local notification
                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                    }
                })
            }
        })
}

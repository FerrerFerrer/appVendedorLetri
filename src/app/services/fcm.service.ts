import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Plugins,Capacitor} from '@capacitor/core';

import {
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/push-notifications';


const { PushNotifications } = Plugins;
@Injectable({
  providedIn: 'root'
})

export class FcmService {

  constructor(private router: Router) { }

  public initPush() {
    if (Capacitor.platform !== 'web') {
      this.registerPush();
    }
  }

  private registerPush() {
    PushNotifications.requestPermission().then((permission) => {
      if (permission.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        console.log("Register with Apple / Google to receive push via APNS/FCM")
        PushNotifications.register();
      } else {
        // No permission for push granted
        console.log("No permission for push granted")
      }
    });

    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        console.log('My token: ' + JSON.stringify(token));
      }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotification) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification));
        if (data.detailsId) {
          // this.router.navigateByUrl(`/login/${data.detailsId}`);
          this.router.navigateByUrl(`/login/1`);
        }
      }
    );
  }
}
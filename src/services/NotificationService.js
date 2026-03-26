import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { apiCall } from '../utils/api';

class NotificationService {
  async init() {
    if (Capacitor.getPlatform() === 'web') return;

    await this.registerNotifications();
    this.addListeners();
    this.setupDeepLinking();
  }

  setupDeepLinking() {
    App.addListener('appUrlOpen', (data) => {
      console.log('App opened with URL:', data.url);
      const slug = data.url.split('.com').pop();
      if (slug) window.location.hash = slug; 
    });
  }

  async registerNotifications() {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      console.warn('User denied push notification permissions');
      return;
    }

    await PushNotifications.register();
  }

  addListeners() {
    PushNotifications.addListener('registration', async ({ value: token }) => {
      console.log('Push registration success, token:', token);
      try {
        await apiCall('/notifications/register', 'POST', { token });
      } catch (err) {
        console.error('Failed to register token with backend', err);
      }
    });

    PushNotifications.addListener('registrationError', (error) => {
      console.error('Error on registration:', JSON.stringify(error));
    });

    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Push received:', JSON.stringify(notification));
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      const data = notification.notification.data;
      if (data?.path) {
        window.location.hash = data.path;
      }
    });
  }
}

export default new NotificationService();

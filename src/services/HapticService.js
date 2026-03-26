import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

class HapticService {
  async impact(style = ImpactStyle.Light) {
    if (Capacitor.isNativePlatform()) {
      const enabled = JSON.parse(localStorage.getItem('fx_haptics')) ?? true;
      if (enabled) await Haptics.impact({ style });
    }
  }

  async notification(type = NotificationType.Success) {
    if (Capacitor.isNativePlatform()) {
      const enabled = JSON.parse(localStorage.getItem('fx_haptics')) ?? true;
      if (enabled) await Haptics.notification({ type });
    }
  }

  async selection() {
    if (Capacitor.isNativePlatform()) {
      await Haptics.selectionStart();
      await Haptics.selectionChanged();
      await Haptics.selectionEnd();
    }
  }
}

export default new HapticService();

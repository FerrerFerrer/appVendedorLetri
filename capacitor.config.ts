import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.letrimex.appVendedor',
  appName: 'appVendedor',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    splashScreen:{
      launchShowDuration: 0
    },
    PushNotification:{
      presentationOptions: ["badge", "sound" , "alert"]
    }
  }

};

export default config;

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hotelkeys.app',
  appName: 'Hotel Keys',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true,
    allowNavigation: ['*']
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined
    },
    minSdkVersion: 14, // Mantido para Android 4.0.4 (API 14)
    targetSdkVersion: 19, // Reduzido para melhor compatibilidade
    versionCode: 1,
    versionName: "1.0.0",
    allowMixedContent: true,
    appendUserAgent: "HotelKeys Android App",
    overrideUserAgent: false,
    backgroundColor: "#4F46E5",
    compileSdkVersion: 19, // Adicionado para compatibilidade
    buildToolsVersion: "19.1.0", // Versão específica das build tools
    enableLegacyBridgeMode: true, // Habilita modo legado para compatibilidade
    minifyEnabled: false, // Desativa minificação para evitar problemas
    multiDexEnabled: false // Desativa multidex que não é suportado em APIs antigas
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#4F46E5",
      showSpinner: true,
      androidSpinnerStyle: "large",
      spinnerColor: "#ffffff"
    }
  }
};

export default config;
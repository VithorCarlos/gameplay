import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';
import AppLoading from 'expo-app-loading';
import { AuthProvider } from './src/hooks/auth';
import { Routes } from './src/routes';
import { Background } from './src/components/Background';

LogBox.ignoreLogs(['You are not currently signed in to Expo on your development machine.'])
export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular, 
    Inter_500Medium,
    Rajdhani_500Medium, 
    Rajdhani_700Bold
  });

  if (!fontsLoaded) {
    //segurar tela de splash
    return <AppLoading/>;
  }

  return(
    //cuida de qual rota que foi aberta anteriormente. Ele guarda e cuida do contexto de rotas
    <Background>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        //conteudo colar no limite da tela
        translucent
      />
      {/* valor inicial do contexto */}
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Background>
  );
}
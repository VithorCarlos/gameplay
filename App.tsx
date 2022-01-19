import React from 'react';
import { StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';
import AppLoading from 'expo-app-loading';

import { Routes } from './src/routes';
import { Background } from './src/components/Background';

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
      <Routes />
    </Background>
  );
}
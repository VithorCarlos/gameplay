import React from 'react';
import { 
  Text, 
  ImageBackground, 
  TouchableOpacity, 
  View, 
  FlatList } from 'react-native';
import { Fontisto } from '@expo/vector-icons'
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { theme } from '../../global/styles/theme';
import bannerImg from '../../assets/banner.png';
import { styles } from './styles';
import { ListHeader } from '../../components/ListHeader';
import { Member } from '../../components/Member';
import { ListDevider } from '../../components/ListDevider';
import { ButtonIcon } from '../../components/ButtonIcon';

export function AppointmentsDetails(){
  const members = [
    {
      id: 1,
      username: 'Vithor',
      avatar_url: 'https://github.com/VithorCarlos.png',
      status: 'online'
    },

    {
      id: 2,
      username: 'Thaís',
      avatar_url: 'https://github.com/VithorCarlos.png',
      status: 'offline'
    }
  ]
  return (
    <Background>
        <Header
          title='Detalhes'
          action={
            <TouchableOpacity activeOpacity={0.7}>
              <Fontisto 
                name='share'
                size={20}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          }
        />

        <ImageBackground 
          source={bannerImg}
          style={styles.banner}
        > 
          <View style={styles.bannerContent}>
            <Text style={styles.title}>
              Lendários
            </Text>
            <Text style={styles.subtitle}>
              É hoje que vamos chegar ao challenger sem perder uma partida da md10
            </Text>
          </View>
        </ImageBackground>
        
        <ListHeader 
          title='Jogadores'
          subtitle='Total 3'
        />

        <FlatList
          data={members}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Member data={item}/>
          )}
          ItemSeparatorComponent={ListDevider}
          style={styles.members}
        />
        <View style={styles.footer}>
          <ButtonIcon title='Entrar na Partida'/>
        </View>
        
    </Background>
  );
}

export default AppointmentsDetails;
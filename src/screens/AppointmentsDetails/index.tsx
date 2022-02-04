import React, { useState, useEffect } from 'react';
import { 
  Text, 
  ImageBackground, 
  TouchableOpacity, 
  View, 
  Share,
  Platform,
  FlatList, 
  Alert} from 'react-native';
import { Fontisto } from '@expo/vector-icons'
import { Background } from '../../components/Background';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Header } from '../../components/Header';
import { theme } from '../../global/styles/theme';
import bannerImg from '../../assets/banner.png';
import { styles } from './styles';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDevider } from '../../components/ListDevider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Load } from '../../components/Load';
import { AppointmentProps } from '../../components/Appointment';
import { api } from '../../services/api';
import * as Linking from 'expo-linking';
import { LinearGradient } from 'expo-linear-gradient';
import { ModalAlert } from '../../components/ModalAlert';
import { Button } from '../../components/Button';

type Params = {
  guildSelected: AppointmentProps
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
}

export function AppointmentsDetails(){
  
  const route = useRoute();
  const { guildSelected } = route.params as Params
  const [ widget, setWidget ] = useState<GuildWidget>({} as GuildWidget);
  const [ loading, setLoading ] = useState(true);
  const [ mordalAlert, setModalAlert] = useState(false);
  const {secondary80, secondary100} = theme.colors;

  const navigation = useNavigation();

  async function fetchGuildWidget() {
    try {
      const response = await api.get(`/servers/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);
      setLoading(false);
    } catch {
        setModalAlert(true);
    } 
  }

  function handleShareInvatation() {
    const message = Platform.OS === 'ios' 
    ? `Junte-se a ${guildSelected.guild.name}, convite: ${widget.instant_invite}`
    : widget.instant_invite;

    Share.share({
      message:message, 
      url: widget.instant_invite
    }).then
  }

  function handleOpenGuild(){
    Linking.openURL(widget.instant_invite);
  }

  function handleCloseMordalAlert() {
      setModalAlert(false);
      navigation.navigate('Home');
  }

  useEffect(()=> {
    fetchGuildWidget()
  }, [])

  return (
    <Background>
        <Header
          title='Detalhes'
          action={
            guildSelected.guild.owner &&
            <TouchableOpacity activeOpacity={0.7}>
              <Fontisto 
                name='share'
                size={20}
                color={theme.colors.primary}
                onPress={handleShareInvatation}
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
              { guildSelected.guild.name }
            </Text>
            <Text style={styles.subtitle}>
              {guildSelected.description}
            </Text>
          </View>
        </ImageBackground>

        {
          loading ? <Load /> :
          <>
            <ListHeader 
              title='Jogadores'
              subtitle={`Total ${widget.members.length}`}
            />

          <FlatList
            data={widget.members}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Member data={item}/>
            )}
            ItemSeparatorComponent={() => (<ListDevider isCentered/>)}
            style={styles.members}
          />
        </>
        }

        {
          guildSelected.guild.owner &&
          <View style={styles.footer}>
          <ButtonIcon 
            title='Entrar na Partida'
            onPress={handleOpenGuild}
          />
        </View>
        }
      
      <ModalAlert
        visible={mordalAlert}
      >
        <LinearGradient
          style={styles.modalContainer}
          colors={[secondary80, secondary100]}
        >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            O Widget deve estar habilitado nas configurações do servidor.
            Por Favor, verifique com o administrador do servidor.
          </Text>

          <Button title='Entendi' onPress={handleCloseMordalAlert}/>
        </View>
        </LinearGradient>
      </ModalAlert>
    </Background>
  );
}

export default AppointmentsDetails;
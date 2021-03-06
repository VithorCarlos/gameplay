import React, { useState } from 'react';
import { 
  Text, 
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
  //p qd o teclado subir, fazer a interface subir junto
  KeyboardAvoidingView
 } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { Background } from '../../components/Background';
import { CategorySelect } from '../../components/CategorySelect';
import { Header } from '../../components/Header';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { GuildProps } from '../../components/Guild';
import { Guilds } from '../Guilds';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

export function AppointmentsCreate(){
  const [category, setCategory] = useState('');
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  //armazenar a guild selecionada do servidor. Começa com obj vazio do tipo GuildProps
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [day, setDay] = useState('');
  const [mouth, setMonth] = useState('');
  const [description, setDescription] = useState('');
  const navegation = useNavigation();

  function handleOpenGuilds(){
    setOpenGuildsModal(true);
  }

  function handleCloseGuilds(){
    setOpenGuildsModal(false);
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId)
  }

  function handleGuildSelect(guildSelect: GuildProps){
    //para ter a guild selecionada
    setGuild(guildSelect);
    setOpenGuildsModal(false);
  }

  async function handleSave() {
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${mouth} às ${hour}:${minute}h`,
      description: description
    };

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointmentss = await storage ? JSON.parse(storage) : [];
    
    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      //acrecestar tudo que tinha antes e o novo agendamento
      JSON.stringify([...appointmentss, newAppointment]));

      navegation.navigate('Home');
  }
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Background>
        <ScrollView>
            <Header title='Agendar Partida'/>

            <Text style={[styles.label, 
              {marginLeft: 24, marginTop: 36, marginBottom: 18}]}
            >
              Categoria
            </Text>

          <CategorySelect
            hasCheckBox 
            setCategory={handleCategorySelect}
            categorySelected={category}
          />

          <View style={styles.form}>
            <TouchableOpacity activeOpacity={0.7} onPress={handleOpenGuilds}> 
              <View style={styles.select}>
                {
                  guild.icon 
                  ? <GuildIcon guildId={guild.id} iconId={guild.icon}/> 
                  : <View style={styles.image}/>
                }
              
                <View style={styles.selectBody}> 
                  <Text style={styles.label}>
                    {guild.name ? guild.name : 'Selecione um servidor'}
                  </Text>                             
                </View>

              <Feather 
                name='chevron-right'
                color={theme.colors.heading}
                size={18}
              />

              </View>
            </TouchableOpacity>
            
            <View style={styles.field}>
              <View>
                <Text style={[styles.label, {marginBottom: 12}]}>
                  Dia e mês
                </Text>
                  <View style={styles.column}>
                    <SmallInput 
                      maxLength={2}
                      onChangeText={setDay}
                    />
                    <Text style={styles.divider}>
                      /
                    </Text>
                    <SmallInput 
                      maxLength={2}
                      onChangeText={setMonth}
                    />
                </View >
              </View>

              <View>
                <Text style={[styles.label, {marginBottom: 12}]}>
                  Hora e  minuto
                </Text>
                  <View style={styles.column}>
                    <SmallInput 
                      maxLength={2}
                      onChangeText={setHour}
                    />
                    <Text style={styles.divider}>
                      :
                    </Text>
                    <SmallInput 
                      maxLength={2}
                      onChangeText={setMinute}
                    />
                </View >
              </View>
            </View>

            <View style={[styles.field, {marginBottom: 12}]}>
              <Text style={styles.label}>
                Descrição
              </Text>

              <Text style={styles.caractersLimit}>
                Max 100 caracteres
              </Text>   
            </View>

            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              onChangeText={setDescription}
            />

            <View style={styles.footer}>
              <Button 
                title='Agendar'
                onPress={handleSave}
              />
            </View>

          </View>
        </ScrollView>
      </Background>
      <ModalView 
        visible={openGuildsModal}
        closeModal={handleCloseGuilds}
        statusBarTranslucent
      >
        <Guilds handleGuildSelect={handleGuildSelect}/>
      </ModalView>
    </KeyboardAvoidingView>
  );
}

export default AppointmentsCreate;
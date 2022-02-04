import React, {useState, useCallback} from 'react';
import { 
    View, 
    FlatList
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ButtonAdd } from '../../components/ButtonAdd';
import { Profile } from '../../components/Profile';
import { Load } from '../../components/Load';
import { CategorySelect } from '../../components/CategorySelect';
import { styles } from './styles';
import { ListHeader } from '../../components/ListHeader';
import { ListDevider } from '../../components/ListDevider';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { Background } from '../../components/Background';

export function Home() {
    const [category, setCategory] = useState('');
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

    function handleCategorySelect(categoryId: string) {
        //se o id atual é o mesmo que estou clicando então vou desmarcar ele 
        //entao atribua o novo id
        categoryId === category ? setCategory('') : setCategory(categoryId)
    }

    function handleAppointmentsDetails(guildSelected: AppointmentProps)
    {
        navigation.navigate('AppointmentsDetails', { guildSelected });
    }

    function handleAppointmentsCreate(){
        navigation.navigate('AppointmentsCreate');
    }

    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage = response ? JSON.parse(response) : [];

        if (category) {
            setAppointments(storage.filter(item => item.category === category));
        } else {
            setAppointments(storage);
        }
        setLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadAppointments()
    },[category]));

    return (
        <Background>
            <View style={styles.header}>
                <Profile/>
                <ButtonAdd onPress={handleAppointmentsCreate}/>
            </View>
            
            <CategorySelect 
                categorySelected={category}
                //função que vai atualizar o estad
                setCategory={handleCategorySelect}
            />

  
        {   
            loading ? <Load/> :
            <>
                <ListHeader
                title='Partidas Agendadas'
                subtitle={`Total ${appointments.length}`}
            />
        
            <FlatList 
                data={appointments}
                //pg do item a propriedade que quer eleger como ID
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Appointment data={item} onPress={() => handleAppointmentsDetails(item)}/>
                )}
                //divisor de listas
                ItemSeparatorComponent={() => <ListDevider/>}
                style={styles.matches}
                showsVerticalScrollIndicator={false}
                //estibilização interna na lista
                contentContainerStyle={{ paddingBottom: 50 }}
            />
            </>
        }
        </Background>
    );  
}
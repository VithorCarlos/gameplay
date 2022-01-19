import React, {useState} from 'react';
import { 
    View, 
    FlatList
} from 'react-native';
import { ButtonAdd } from '../../components/ButtonAdd';
import { Profile } from '../../components/Profile';
import { CategorySelect } from '../../components/CategorySelect';
import { styles } from './styles';
import { ListHeader } from '../../components/ListHeader';
import { ListDevider } from '../../components/ListDevider';
import { Appointment } from '../../components/Appointment';

export function Home() {
    const [category, setCategory] = useState('');
    
    const appointments = [
        {
            id: '1',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: null,
                owner: true
            },

            category: '1',
            date: '22/06 ás 20:40',
            description: 'É hoje que vamos chegar ao challanger  sem perder partida uma partida da md10'
        },

        {
            id: '2',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: null,
                owner: true
            },

            category: '2',
            date: '22/06 ás 20:40',
            description: 'É hoje que vamos chegar ao challanger  sem perder partida uma partida da md10'
        }
    ];

    function handleCategorySelect(categoryId: string) {
        //se o id atual é o mesmo que estou clicando então vou desmarcar ele 
        //entao atribua o novo id
        categoryId === category ? setCategory('') : setCategory(categoryId)
    }
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Profile/>
                <ButtonAdd/>
            </View>
            
            <CategorySelect 
                categorySelected={category}
                //função que vai atualizar o estado
                setCategory={handleCategorySelect}
            />

            <View style={styles.content}>
                <ListHeader
                    title='Partidas Agendadas'
                    subtitle='Total 6'
                />

                <FlatList 
                    data={appointments}
                    //pg do item a propriedade que quer eleger como ID
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Appointment data={item}/>
                    )}
                    //divisor de listas
                    ItemSeparatorComponent={() => <ListDevider/>}
                    style={styles.matches}
                    showsVerticalScrollIndicator={false}
                />
            </View>  
        </View>
    );  
}
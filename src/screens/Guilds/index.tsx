import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Guild, GuildProps } from '../../components/Guild';
import { Load } from '../../components/Load';
import { ListDevider } from '../../components/ListDevider';

import { styles } from './styles';
import { api } from '../../services/api';

type Props = {
    handleGuildSelect: (guild: GuildProps) => void
}

export function Guilds({handleGuildSelect}: Props) {
    const [guilds, setGuilds] = useState<GuildProps[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchGuilds() {
        const response = await api.get('/users/@me/guilds'); 
   
        setGuilds(response.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchGuilds();
    }, [])

  return (
    <View style={styles.container}>
        {
            loading ? <Load/> :
            <FlatList 
            data={guilds}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <Guild  
                    data={item} 
                    onPress={() => handleGuildSelect(item)}
                />
            )}
            ItemSeparatorComponent={() => <ListDevider isCentered/>}
            ListHeaderComponent={() => <ListDevider isCentered/>}
            showsVerticalScrollIndicator={false}
            style={styles.guilds}
            contentContainerStyle={{ paddingBottom: 50, paddingTop: 100 }}
            />
        }
 
    </View>
    );
}


import React from 'react';
import { View, FlatList } from 'react-native';
import { GuildProps } from '../../components/Guild';
import { Guild } from '../../components/Guild';
import { ListDevider } from '../../components/ListDevider';

import { styles } from './styles';

type Props = {
    handleGuildSelect: (guild: GuildProps) => void
}

export function Guilds({handleGuildSelect}: Props) {
    const guilds = [
        {
            id: 1,
            name: 'Lendários',
            icon: 'a',
            owner: true
        },

        {
            id: 2,
            name: 'Chanllanger',
            icon: 'a',
            owner: true
        },
    ]

  return (
    <View style={styles.container}>
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
    </View>
    );
}


import React from 'react';
import {
    Text,
    Image,
    View,
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native';

import DiscordImg from '../../assets/discord.png';
import { styles } from './styles';

//recebe todas as propriedades de TouchableOpacityProps mais as que eu definir
type Props = TouchableOpacityProps & {
    title: string;
}

export function ButtonIcon({ title, ...rest}: Props) {
    return (
        //evento de click
        <TouchableOpacity 
            style={styles.container}
            //todo resto das propriedades. Um atalho do react
            {...rest}
        >
            <View style={styles.iconWrapper}>
                <Image source={DiscordImg} style={styles.icon} />
            </View>

            <Text style={styles.title}>
                { title }
            </Text>
        </TouchableOpacity>
    );
}


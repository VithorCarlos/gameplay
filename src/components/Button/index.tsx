import React from 'react';
import {
    Text,
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native';

import { styles } from './styles';

//recebe todas as propriedades de TouchableOpacityProps mais as que eu definir
type Props = TouchableOpacityProps & {
    title: string;
}

export function Button({ title, ...rest}: Props) {
    return (
        //evento de click
        <TouchableOpacity 
            style={styles.container}
            //todo resto das propriedades. Um atalho do react
            {...rest}
        >
        <Text style={styles.title}>
            { title }
        </Text>
        </TouchableOpacity>
    );
}


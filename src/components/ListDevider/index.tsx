import React from 'react';
import { View } from 'react-native';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

type Props = {
    isCentered?: boolean;
}

export function ListDevider({isCentered}: Props) {

    return (
        <View 
            style={[
                styles.container, 
                isCentered ? {
                    marginVertical: 12
                } : {
                    marginTop: 2,
                    marginBottom: 31
                }
            ]}
        />
    );
}

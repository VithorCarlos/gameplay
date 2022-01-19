import React from 'react';
import { 
    View, 
    Text,     
    TouchableOpacity,
    TouchableOpacityProps 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';


export function ButtonAdd({...rest} : TouchableOpacityProps) {
    return (
        <TouchableOpacity 
            style={styles.container}
            
        > 
            <MaterialCommunityIcons
                name='plus'
                color={theme.colors.heading}
                size={24}
            />
        </TouchableOpacity>
    );
}
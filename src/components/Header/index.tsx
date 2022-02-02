import React, {ReactNode} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../global/styles/theme';
import { Feather } from '@expo/vector-icons'
import { styles } from './styles';

type Props = {
    title: string;
    //vai ser um nó do react. Dessa forma posso passar de forma dinamica, oque posso inserir
    //na interface que chamar o header
    action?: ReactNode;
}

export function Header({title, action}: Props) {
    const {secondary100, secondary40, heading} = theme.colors;
    
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }
    return (
        <LinearGradient
            style={styles.container}
            colors={[secondary100, secondary40]}
        >
            {/* Botão indicado para oq so vai conter icones */}
            <TouchableOpacity activeOpacity={0.7} onPress={handleGoBack}>
                <Feather
                    name='arrow-left'
                    size={24}
                    color={heading}
                />
            </TouchableOpacity>

            <Text style={styles.title}>
                { title }
            </Text>

            { action &&
                <View>
                    {action}
                </View>
            }
        </LinearGradient>
    );  
}
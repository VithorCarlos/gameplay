import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image } from 'react-native';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';


type Props = {
    urlImage: string,

}

export function Avatar({urlImage} : Props) {
    const {secondary50, secondary70} = theme.colors;

    return (
        <LinearGradient
        style={styles.container}
        //de cor até que dor ele deve ir
        colors={[secondary50, secondary70]}
        >
            <Image 
                source={{uri : urlImage}}
                style={styles.avatar}
            />
        </LinearGradient>
    );
}

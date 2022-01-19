import React from 'react';
import { Image} from 'react-native';
import { styles } from './styles';

export function GuildIcon() {
    const uri = 'https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-logodownload-download-logotipos-1.png';
    return (
        <Image 
            source={{ uri }}
            style={styles.image} 
            //para a imagem se ajustar quando nao tiver uma resolução legal 
            resizeMode='cover'
        />          
    );
}
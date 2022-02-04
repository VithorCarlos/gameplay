import React from 'react';
import { Image, View} from 'react-native';
import { styles } from './styles';
import { CDN_IMAGE } from '../../configs';
import DiscordSvg from '../../assets/discord.svg'

type Props = {
    guildId: string;
    iconId: string | null;
}



export function GuildIcon({guildId, iconId}: Props) {
    const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;
    //https://play-lh.googleusercontent.com/Wq15hCMPJW-eUz-c4DtnUxHkk2s-pVra14td-E4b05Eo-Cu8Koj6BqPUNULbh9HfjpkC
    return (
        <View style={styles.container}>
            {
                iconId ? 
                <Image 
                source={{ uri }}
                style={styles.image} 
                //para a imagem se ajustar quando nao tiver uma resolução legal 
                resizeMode='cover'
                />   
                :
                <DiscordSvg 
                width={40}
                height={40}
                
                />
            }
        </View> 
    );
}
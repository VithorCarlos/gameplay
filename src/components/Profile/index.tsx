import React, { useState } from 'react';
import { 
    View, 
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';
import { theme } from '../../global/styles/theme';
import { useAuth } from '../../hooks/auth';
import { Avatar } from '../Avatar';
import { ModalLogout } from '../ModalLogout';
import { styles } from './styles';

export function Profile() {
    const { user, logout } = useAuth();
    const [ openLogoutModal, setOpenLogoutModal] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => setOpenLogoutModal(true)}>
                <Avatar urlImage={user.avatar}/>
            </TouchableOpacity>
            
            <View>    
                <View style={styles.user}>
                    <Text style={styles.greeting}>
                        Olá,
                    </Text>

                    <Text style={styles.username}>
                        {user.firstName}
                    </Text>
                </View>

                <Text style={styles.message}>
                    Hoje é dia de vitória
                </Text>
            </View>

            <ModalLogout
                visible={openLogoutModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalTitle}>
                        <Text style={styles.modalTextMedium}>Deseja sair do </Text>
                        <Text style={styles.modalTextBold}>Game</Text>
                        <Text style={[styles.modalTextBold, 
                            {color: theme.colors.primary}]}>Play</Text>
                        <Text style={styles.modalTextBold}>?</Text>
                    </View>

                    <View style={styles.modalButton}>
                        <TouchableOpacity 
                            activeOpacity={0.7}
                            style={styles.modalButtonCancel}
                            onPress={() => setOpenLogoutModal(false)}
                        >
                            <Text style={styles.modalOptionText}>Não</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            activeOpacity={0.7}
                            style={styles.modalButtonAccept}
                            onPress={logout}
                        >
                            <Text style={styles.modalOptionText}>Sim</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ModalLogout>
        </View>    
    );
}
import React, {ReactNode} from 'react';
import { 
    View, 
    Modal, 
    ModalProps,
    //identificar click do usuario, qualquer região. E quando ele clica não tem efeito visual, 
    //simplesmente executar alguma coisa
} from 'react-native';
import { Background } from '../Background';

import { styles } from './styles';

type Props = ModalProps & {
    children: ReactNode;
}

export function ModalAlert({children, ...rest}: Props){

    return (
        <Modal
            transparent
            animationType='slide'
            {...rest}
        >       
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {children}
                </View>
            </View> 
        </Modal>
    );
}

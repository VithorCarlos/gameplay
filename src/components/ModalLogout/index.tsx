import React, {ReactNode} from 'react';
import { 
    View, 
    Modal, 
    ModalProps,
    //identificar click do usuario, qualquer região. E quando ele clica não tem efeito visual, 
    //simplesmente executar alguma coisa
    TouchableWithoutFeedback,
} from 'react-native';
import { Background } from '../Background';

import { styles } from './styles';

type Props = ModalProps & {
    children: ReactNode;
}

export function ModalLogout({children, ...rest}: Props){

    return (
        <Modal
            transparent
            animationType='slide'
            {...rest}
        >       
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Background>
                        {/* interface que vamos embrulhar com o modal */}
                        {children}
                    </Background>
                </View>
            </View> 
        </Modal>
    );
}

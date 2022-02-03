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
    closeModal: () => void;
}

export function ModalView({children, closeModal, ...rest}: Props){

    return (
        <Modal
            transparent
            animationType='slide'
            {...rest}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <Background>
                            <View style={styles.bar}/>
                            {/* interface que vamos embrulhar com o modal */}
                            {children}
                        </Background>
                    </View>
                </View> 
            </TouchableWithoutFeedback>
        </Modal>
    );
}

import React, {ReactNode} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type Props = {
    //elemento filho do react que vai ser embrulhado por td gradient
    children: ReactNode;
}


export function Background({children}: Props) {
    const {secondary80, secondary100} = theme.colors;
    return (
        <LinearGradient
            style={styles.container}
            //de cor até que dor ele deve ir
            colors={[secondary80, secondary100]}
        >
            {children}
        </LinearGradient>
    );
}
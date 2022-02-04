import React, {ReactNode} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type Props = {
    //elemento filho do react que vai ser embrulhado por td gradient
    children: ReactNode;
    borderRadius?: number;
}


export function Background({children, borderRadius}: Props) {
    const {secondary80, secondary100} = theme.colors;
    return (
        <LinearGradient
            style={[styles.container, {borderRadius: borderRadius}]}
            //de cor até que dor ele deve ir
            colors={[secondary80, secondary100]}
        >
            {children}
        </LinearGradient>
    );
}
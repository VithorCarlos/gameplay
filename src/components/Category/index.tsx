import React from "react";
import { TouchableOpacity,TouchableOpacityProps, View, Text } from "react-native";
import { SvgProps } from 'react-native-svg';
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../../global/styles/theme";
import { styles } from "./styles";

type Props = TouchableOpacityProps & {
    title: string;
    icon: React.FC<SvgProps>;
    checked?: boolean;
    hasCheckBox?: boolean;
}

export function Category({
    title,
    //converter icon para letra maiúscula para usa-lo como componente, por ser uma regra do react
    icon: Icon,
    checked = false,
    hasCheckBox = false,
    ...rest
}: Props) {
    const {secondary40, secondary50, secondary70, secondary85} = theme.colors;

    return (
        <TouchableOpacity {...rest}>
            <LinearGradient
                style={styles.container}
                //de cor até que dor ele deve ir
                colors={[secondary50, secondary70]}
            >
                    
                <LinearGradient 
                    style={[styles.content, {opacity: checked ? 1 : 0.5}]}
                    colors={[checked ? secondary85 : secondary40, secondary50]}
                >
                    {
                        hasCheckBox &&
                        <View style={checked ? styles.checked : styles.check} />  
                    }
                    
                    <Icon 
                        width={48} 
                        height={48}
                        />
                    <Text style={styles.title}>
                        { title }
                    </Text>
                </LinearGradient>
            </LinearGradient>
        </TouchableOpacity>
    );
}

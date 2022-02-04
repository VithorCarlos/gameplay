import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 174
    },

    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: theme.colors.overlayBlack,
    },
})
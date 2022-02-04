import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    user: {
        flexDirection: 'row'
    },

    greeting: {
        fontFamily: theme.fonts.title500,
        fontSize: 24,
        color: theme.colors.heading,
        marginRight: 5
    },

    username: {
        fontFamily: theme.fonts.title700,
        fontSize: 24,
        color: theme.colors.heading
    },

    message: {
        fontFamily: theme.fonts.text400,
        color: theme.colors.highlight
    },

    modalContainer: {
        flex: 1,    
    },

    modalTitle: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 28,
        marginBottom: 25
    },

    modalButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },

    modalTextMedium: {
        fontSize: 24,
        fontFamily: theme.fonts.title500,
        color: theme.colors.heading
    }, 

    modalTextBold: {
        fontSize: 24,
        fontFamily: theme.fonts.title700,
        color: theme.colors.heading
    },

    modalOptionText: {
        fontFamily: theme.fonts.text500,
        color: theme.colors.heading
    },

    modalButtonCancel: {
        width: 160,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.secondary30,
        marginRight: 12,
        borderRadius: 8
    }, 

    modalButtonAccept: {
        width: 160,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        borderRadius: 8
    }
});
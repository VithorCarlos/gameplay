declare module '*.svg' {
    import React from 'react';
    import { SvgProps } from 'react-native-svg';

    //O conteudo é um function compenent - componente funcional
    const content: React.FC<SvgProps>;
    export default content;
}
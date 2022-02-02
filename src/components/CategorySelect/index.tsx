import React from 'react';
import { 
    View, 
    ScrollView,     

} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { categories } from '../../utils/categories';
import { Category } from '../Category';

type Props = {
    categorySelected: string;
    //uma função que tem um tipo de return
    setCategory: (categoryId: String) => void;
    hasCheckBox?: boolean,
}

export function CategorySelect({
    categorySelected, 
    setCategory,
    hasCheckBox = false,
}: Props) {
    return (
        <ScrollView 
            horizontal
            style={styles.container}
            showsHorizontalScrollIndicator={false}
            //para que quando a rolagem termine, tenha um espaçamento da borda batendo com o espaçamento do botao 
            contentContainerStyle={{paddingRight: 40}}
        >
            {
                //percorrer categorias
                categories.map(category => (
                    //gerar um novo componente
                    <Category
                    //sempre colocar uma chave por questoes de performance do react
                        key={category.id}
                        title={category.title}
                        icon={category.icon}
                        checked={category.id === categorySelected}
                        onPress={() => setCategory(category.id)}
                        hasCheckBox={hasCheckBox}
                    />
                ))
            }
        </ScrollView>
    
    );
}
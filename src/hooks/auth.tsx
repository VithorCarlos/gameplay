import React, { 
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect
} from 'react';
import * as AuthSession from 'expo-auth-session';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
    SCOPE, 
    CLIENT_ID, 
    CDN_IMAGE, 
    REDIRECT_URI,
    RESPONDE_TYPE} from '../configs';

import { COLLECTION_USERS } from '../configs/database';

import { api } from '../services/api';

type User = {
    id: string;
    username: string;
    firstName: string;
    avatar: string;
    email: string;
    token: string;
}

type AuthContextData = {
    user: User;
    //se carregou os dados
    loading: boolean;
    signIn: () => Promise<void>;
    logout: () => Promise<void>;
}

type AuthProviderProps = {
    children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
    params: {
        access_token?: string;
        error?: string;
    }
}

//valor inicial
export const AuthContext = createContext({} as AuthContextData); 

//Passar para o provide quem vai ter acessoa esse contexto
export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<User>({} as User);
    //saber se o já acabou o processo de autenticação
    const [loading, setLoading] = useState(false);

    async function signIn() {
        try {
            setLoading(true);
            
            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONDE_TYPE}&scope=${SCOPE}`
            
            const {type, params} = await AuthSession.
            //authUrl - para onde user tem que ir quando começar o processo de autenticação
            startAsync({ authUrl }) as AuthorizationResponse;

            if (type === 'success' && !params.error){
                //acressentar no cabeçalho. Camada necessária para ter acesso aos dados do usuário.
                api.defaults.headers.authorization = `Bearer ${params.access_token}`;

                const userInfo = await api.get('/users/@me');
                
                const firstName = userInfo.data.username.split(' ')[0]
                userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

                const userData = {
                   //desestruturar tudo
                   ...userInfo.data,
                   firstName,
                   token: params.access_token
                }

                //NO ASYNC TEM QUE SALVAR OBJ COMO TEXTO
                await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));
     
                setUser(userData);
            } 
        } catch {
            throw new Error('Não foi possível autenticar');
        } finally {
            setLoading(false);
        }
    }

    async function logout() {
        setUser({} as User);
        await AsyncStorage.removeItem(COLLECTION_USERS);
    }

    async function loadUserStorageData() {
        const storage = await AsyncStorage.getItem(COLLECTION_USERS);

        if (storage) {
            const userLogded = JSON.parse(storage) as User;
            api.defaults.headers.authorization = `Bearer ${userLogded.token}`;
            setUser(userLogded);
        }
    }

    //buscar no dispositivo os dados armazenados localmente
    useEffect(() => {
        loadUserStorageData();
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signIn,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

//criando nosso proprio hook
export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}


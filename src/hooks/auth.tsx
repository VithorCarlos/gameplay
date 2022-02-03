import React, { 
    createContext,
    useContext,
    useState,
    ReactNode
} from 'react';
import * as AuthSession from 'expo-auth-session';

import { 
    SCOPE, 
    CLIENT_ID, 
    CDN_IMAGE, 
    REDIRECT_URI,
    RESPONDE_TYPE} from '../configs';
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
}

type AuthProviderProps = {
    children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
    params: {
        access_token: string;
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
            //authUrl - para onde user tem que ir quando começar o processo de autenticação
            const {type, params} = await AuthSession.
            startAsync({ authUrl }) as AuthorizationResponse;
            if (type === 'success'){
                //acressentar no cabeçalho
                api.defaults.headers.authorization = `Bearer ${params.access_token}`;
                const userInfo = await api.get('/users/@me');
                
                const firstName = userInfo.data.username.split(' ')[0]
                userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

                setUser({
                    //desestruturar tudo
                    ...userInfo.data,
                    firstName,
                    token: params.access_token
                });
                setLoading(false);
            } else {
                setLoading(false);
            }

        } catch {
            throw new Error('Não foi possível autenticar');
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signIn
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


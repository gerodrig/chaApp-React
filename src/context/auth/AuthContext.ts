import { createContext } from 'react';
import { IAuthContext, IAuthState } from '../../types/interfaces';


export const AuthContext = createContext<IAuthContext>({} as IAuthContext);


export const AuthInitialState: IAuthState = {
    uid: null,
    checking: true,
    isLogged: false,
    name: null,
    email: null,
};

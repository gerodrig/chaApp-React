export interface IAuthContext {
    auth: IAuthState;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<IFetchAuthResponse>;
    verifyToken: () => Promise<IFetchAuthResponse>;
    logout?: () => void;
}

export interface UserData {
    email: string;
    password: string;
    online?: boolean;
    name?: string;
    uid?: string;
}


export interface IAuthState {
    uid: string | null | undefined;
    checking: boolean;
    isLogged: boolean;
    name: string | null | undefined;
    email: string | null | undefined;
}

export interface IFetchAuth {
    endpoint: string;
    data: UserData;
    method: string;
}

export interface IFetchAuthResponse {
    ok: boolean;
    token?: string;
    user?: UserData;
    msg?: string;
    messages?: IMessage | IMessage[];
}

export interface IMessage {
    createdAt?: string;
    from?: string;
    message?: string;
    to?: string;
    updatedAt?: string;
    _id?: string;
}

export interface IUser {
    uid: string;
    name: string;
    email: string;
    online: boolean;
}

export interface IChatState {
    uid: string;
    activeChat: string | null;
    users: IUser[];
    chats: IMessage[];
}

export interface IChatAction {
    type: string;
    payload?: IUser[] | IMessage[] | IMessage | string | null;
}

export interface IChatContext {
    chatState: IChatState;
    dispatch: React.Dispatch<IChatAction>;
}


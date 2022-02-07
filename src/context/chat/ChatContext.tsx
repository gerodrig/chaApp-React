import { createContext, useReducer } from 'react';
import { IChatContext, IChatState, IMessage, IUser } from '../../types/interfaces';
import { chatReducer } from './chatReducer';

type IChatProviderProps = {
	children: React.ReactNode;
};

export const ChatContext = createContext({} as IChatContext);

const initialState: IChatState = {
    uid: '',
    activeChat: null, // user id of the active chat
    users: [] as IUser[],  //all users from database
    chats: [] as IMessage[], //selected chat
}

export const ChatProvider = ({ children }: IChatProviderProps) => {

    const [chatState, dispatch] = useReducer(chatReducer, initialState);

	return (
		<ChatContext.Provider
			value={{
				chatState,
                dispatch
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

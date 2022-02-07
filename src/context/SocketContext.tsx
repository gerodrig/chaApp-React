import { createContext, ReactNode, useContext, useEffect } from 'react';
import { Socket } from 'socket.io-client';

import { AuthContext, ChatContext } from '.';

import { IUser, IMessage } from '../types/interfaces';
import { types } from '../types/types';

import { useSocket } from '../hooks/useSocket';
import { scrollToBottomAnimated } from '../helpers';


interface SocketContextProps {
	socket: Socket | null;
	online: Boolean;
}

type UIProviderProps = {
    children: ReactNode;
}


export const SocketContext = createContext({} as SocketContextProps);

//export provider

export const SocketProvider = ({ children }: UIProviderProps ) => {
	const { socket, online, connectSocket, disconnectSocket } = useSocket('http://localhost:8080/');

	const { auth } = useContext(AuthContext);

	const {dispatch} = useContext(ChatContext);

	useEffect(() => {
		if(auth.isLogged) {
			connectSocket();
		}
	}, [ auth, connectSocket ])

	useEffect(() => {
		if(!auth.isLogged) {
			disconnectSocket();
		}
	}, [ auth, disconnectSocket ])

	//listen to changes in connected users
	useEffect(() => {
		socket?.on('users-connected', (users: IUser[]) => {
			//console.log('users-connected', users);
			dispatch({
				type: types.loadedUsers,
				payload: users
			});
		});
	}, [ socket ])

	//listen to all messages
	useEffect(() => {
		socket?.on('personal-message', (message: IMessage) => {
			//console.log('personal-message', message);

			//execute the message dispatch
			dispatch({
				type: types.newMessage,
				payload: message
			});
			//Move the scroll to the end.
			scrollToBottomAnimated('messages');
		});
	}, [ socket, dispatch ]);


	return (
		<SocketContext.Provider
			value={{
				socket,
				online,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

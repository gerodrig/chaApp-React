import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

export interface useSocketProps {
	socket: Socket;
	online: boolean;
	connectSocket: () => void;
	disconnectSocket: () => void;
}

//serverPath will be received to indicate the server path
export const useSocket = (serverPath: string) => {

	//create a state for the socket
	const [socket, setSocket] = useState<Socket | null>(null);

	const [online, setOnline] = useState<Boolean>(false);

	const connectSocket = useCallback(() => {

		//get token
		const token = localStorage.getItem('token');

		//create a socket
		const socketTemp = io(serverPath, {
			transports: ['websocket'],
			autoConnect: true,
			forceNew: true,
			query: {
				'x-token': token
			}
		});

		//set the socket
		setSocket(socketTemp);
	}, [serverPath]);

	const disconnectSocket = useCallback(() => {
		//disconnect the socket
			socket?.disconnect();
	}, [socket]);

	//Check the changes on the socket connection
	useEffect(() => {
		setOnline(socket?.connected ?? false);
	}, [socket]);

	useEffect(() => {
		socket?.on('connect', () => {
			setOnline(true);
		});
	}, [socket]);

	useEffect(() => {
		socket?.on('disconnect', () => {
			setOnline(false);
		});
	}, [socket]);

	return {
		socket,
		online,
		connectSocket,
		disconnectSocket
	};
};

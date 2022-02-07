import { AppRouter } from './router';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, ChatProvider, SocketProvider } from './context';

export const ChatApp = () => {
	return (
		<ChatProvider>
			<AuthProvider>
				<SocketProvider >
					<BrowserRouter>
						<AppRouter />
					</BrowserRouter>
				</SocketProvider>
			</AuthProvider>
		</ChatProvider>
	);
};

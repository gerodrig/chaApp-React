import { AuthContext } from '../context';
import { ChatPage } from '../pages';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PublicRoute } from '.';
import { useContext, useEffect } from 'react';

export const AppRouter = () => {
	const { auth, verifyToken } = useContext(AuthContext);

	const { isLogged } = auth;

	useEffect(() => {
		verifyToken();
	}, [verifyToken]);

	if(auth.checking) {
			return <h2>Please Wait...</h2>
	}

	return (
		<div>
			<Routes>
				{/* //Public Route */}
				{!isLogged && (
					<Route path='auth/*' element={<PublicRoute />} />
				)}

				{/* //Private Route */}
				{isLogged && (
						<Route path='/' element={<ChatPage />} />
				)}

				{/* /any other Route */}
				<Route path='*' element={<Navigate to={ isLogged ? '/' : 'auth/login'} />} />
			</Routes>
		</div>
	);
};

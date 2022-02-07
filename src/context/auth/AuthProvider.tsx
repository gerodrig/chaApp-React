import { ReactElement, ReactNode, useCallback, useContext, useState } from 'react';

import { AuthContext, AuthInitialState, ChatContext } from '..';

import { IAuthState } from '../../types/interfaces';
import { types } from '../../types/types';

import { fetchNoToken, fetchWithToken } from '../../helpers';

export const AuthProvider = ({
	children,
}: {
	children: ReactNode;
}): ReactElement => {
	//create all methdos needed
	const [auth, setAuth] = useState<IAuthState>(AuthInitialState);

	//import dispatch to purge ChatState
	const { dispatch } = useContext(ChatContext);

	const login = async (email: string, password: string) => {
		const response = await fetchNoToken(
			'login',
			{ email, password },
			'POST'
		);
		const { user, ok, token } = response;

		if (ok) {
			localStorage.setItem('token', token!);

			const { name, email, uid } = user!;

			setAuth({
				uid,
				checking: false,
				isLogged: true,
				name,
				email,
			});
		}

		return ok;
	};

	const register = async (name: string, email: string, password: string) => {
		const response = await fetchNoToken(
			'login/new',
			{ name, email, password },
			'POST'
		);

		if (!response.ok) {
			return { ok: false, msg: response.msg };
		}

		const { ok, user, token } = response;

		localStorage.setItem('token', token!);

		const { name: registerName, email: registerEmail, uid } = user!;

		setAuth({
			uid,
			checking: false,
			isLogged: true,
			name: registerName,
			email: registerEmail,
		});

		console.log('register ok');
		return { ok };
	};

	const verifyToken = useCallback(async() => {
		const localToken = localStorage.getItem('token');

		if (!localToken) {
			setAuth({...AuthInitialState, checking: false}) 
			return { ok: false, msg: 'No token' };
		}

		const response = await fetchWithToken('login/renew');

		if (!response.ok) {
			setAuth({...AuthInitialState, checking: false}) 
			return { ok: false, msg: response.msg };
		}

		const { ok, user, token } = response;

		localStorage.setItem('token', token!);

		const { name: registerName, email: registerEmail, uid } = user!;

		setAuth({
			uid,
			checking: false,
			isLogged: true,
			name: registerName,
			email: registerEmail,
		});

		//console.log('register ok');
		return { ok };


	}, []);

	const logout = () => {
		//delete token from local storage
		localStorage.removeItem('token');

		setAuth({...AuthInitialState, checking: false, isLogged: false});

		dispatch({
			type: types.logout,
		});
	};

	return (
		<AuthContext.Provider
			value={{
				auth,
				login,
				register,
				verifyToken,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

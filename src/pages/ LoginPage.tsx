import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import Swal from 'sweetalert2';

import { AuthContext } from '../context';

export const LoginPage = () => {

	const { login } = useContext( AuthContext );

	const navigate = useNavigate();

	const [form, setForm] = useState({
		email: 'Benito@test.com',
		password: '123456',
		rememberMe: false
	});

	//check when remember me is toggled
	useEffect(() => {
		const email = localStorage.getItem('email');
		if( email ) {
			//use form as param to avoid re-render
			setForm((form) => ({
				...form,
				email,
				rememberMe: true,
			}) );
		}

	}, [])

	const onChange = ({target}: ChangeEvent<HTMLInputElement>) => {

		
		const { name, value } = target;

		setForm( (form) => ({
			...form,
			[name]: value
		}));
	}

	const toggleCheck = () => {
		setForm({
			...form,
			rememberMe: !form.rememberMe
		});
	}

	const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		//if rememberMe is checked save the user in localStorage
		( form.rememberMe ) 
			?	localStorage.setItem('email', form.email)
			:	localStorage.removeItem('email');
	
		// send the form to the server
		const { email, password } = form;
		const ok = await login(email, password);	

		if ( !ok ){
			Swal.fire('Error', 'Invalid credentials', 'error');
		}
		//when token is verified navigate to chat
		navigate('/', { replace: true });

	}

	const checkForm = () => {
		return !(form.email.length > 0 && form.password.length > 0) ? true : false;
	}


	return (
		<form 
			className='login100-form validate-form flex-sb flex-w'
			onSubmit={onSubmit}
			>
			<span className='login100-form-title mb-3'>Chat - Log In</span>

			<div className='wrap-input100 validate-input mb-3'>
				<input
					className='input100'
					type='email'
					name='email'
					placeholder='Email'
					autoComplete='off'
					value={form.email}
					onChange={ onChange }
				/>
				<span className='focus-input100'></span>
			</div>

			<div className='wrap-input100 validate-input mb-3'>
				<input
					className='input100'
					type='password'
					name='password'
					placeholder='Password'
					autoComplete='off'
					value={form.password}
					onChange={ onChange }
				/>
				<span className='focus-input100'></span>
			</div>

			<div className='row mb-3'>
				<div 
					className='col'
					onClick={ () => toggleCheck() }	
					>
					<input
						className='input-checkbox100'
						id='ckb1'
						type='checkbox'
						name='rememberMe'
						autoComplete='off'
						checked={form.rememberMe}
						readOnly
					/>
					<label className='label-checkbox100'>Remember me</label>
				</div>

				<div className='col text-right'>
					<Link to='/auth/register' className='txt1'>
						Not Registered?
					</Link>
				</div>
			</div>

			<div className='container-login100-form-btn m-t-17'>
				<button type='submit' className='login100-form-btn' disabled={ checkForm() }>Log in</button>
			</div>
		</form>
	);
};

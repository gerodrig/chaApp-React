import { ChangeEvent, useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';

import { AuthContext } from '../context';



export const RegisterPage = () => {
	const { register } = useContext(AuthContext);

	const [form, setForm] = useState({
		name: '',
		password: '',
		email: '',
	});

	const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = target;

		setForm((form) => ({
			...form,
			[name]: value,
		}));
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		//send the form to the server
		const { name, password, email } = form;
		const {ok, msg: message } = await register(name, email, password);

		console.log(message);

		if (!ok) {
			Swal.fire('Error', message ,  'error');
		}
	};

	const checkForm = () => {
		return !(
			form.name.length > 0 &&
			form.password.length > 0 &&
			form.email.length > 0
		)
			? true
			: false;
	};

	return (
		<form
			className='login100-form validate-form flex-sb flex-w'
			onSubmit={onSubmit}
		>
			<span className='login100-form-title mb-3'>Chat - Register</span>

			<div className='wrap-input100 validate-input mb-3'>
				<input
					className='input100'
					type='text'
					name='name'
					placeholder='Name'
					autoComplete='off'
					value={ form.name }
					onChange={onChange}
				/>
				<span className='focus-input100'></span>
			</div>

			<div className='wrap-input100 validate-input mb-3'>
				<input
					className='input100'
					type='email'
					name='email'
					placeholder='Email'
					autoComplete='off'
					value={form.email}
					onChange={onChange}
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
					onChange={onChange}
				/>
				<span className='focus-input100'></span>
			</div>

			<div className='row mb-3'>
				<div className='col text-right'>
					<Link to='auth/login' className='txt1'>
						Do you have an account?
					</Link>
				</div>
			</div>

			<div className='container-login100-form-btn m-t-17'>
				<button className='login100-form-btn' disabled={checkForm()}>
					Create account
				</button>
			</div>
		</form>
	);
};

import { useContext, useState } from 'react';
import { AuthContext, ChatContext, SocketContext } from '../context';

export const SendMessage = () => {
	const [message, setMessage] = useState('');
	const { socket } = useContext(SocketContext);
	const { auth } = useContext(AuthContext);
	const { chatState } = useContext(ChatContext);

	const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(target.value);
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		//validate if there is a message
		if (message.trim() === '') return;

		//send message
		//console.log('send message', message);

		//clear message
		setMessage('');

		//TODO: emit a socket event to send message
		socket?.emit('personal-message', {
			from: auth.uid,
			to: chatState.activeChat,
			message,
		});
		//TODO: execute the message dispatch

	};

	return (
		<form onSubmit={onSubmit}>
			<div className='type_msg row'>
				<div className='input_msg_write col-sm-9'>
					<input
						type='text'
						name='message'
						className='write_msg'
						placeholder='Message...'
						value={message}
						onChange={onChange}
						autoComplete='off'
					/>
				</div>
				<div className='col-sm-3 text-center'>
					<button className='msg_send_btn mt-3' type='submit'>
						Send
					</button>
				</div>
			</div>
		</form>
	);
};

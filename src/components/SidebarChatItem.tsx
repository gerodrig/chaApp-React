import { useContext } from 'react';

import { ChatContext } from '../context';
import { fetchWithToken, scrollToBottomAnimated } from '../helpers';

import { IUser, IMessage } from '../types/interfaces';
import { types } from '../types/types';

type ISideBarChatItemProps = {
	user: IUser;
};

export const SidebarChatItem = ({ user }: ISideBarChatItemProps) => {
	const { name, online } = user;

	const { chatState, dispatch } = useContext(ChatContext);
	const { activeChat } = chatState;

	const onClick = async () => {
		dispatch({
			type: types.activateChat,
			payload: user.uid,
		});

		//load chat messages
		const response = await fetchWithToken(`messages/${user.uid}`);

		//dispatch an action to load messages
		dispatch({
			type: types.loadChatMessages,
			payload: response.messages as IMessage[],

		})

		//scroll to bottom
		scrollToBottomAnimated('messages');
	};

	return (
		<div
			className={`chat_list ${activeChat === user.uid && 'active_chat'}`}
			onClick={onClick}
		>

			<div className='chat_people'>
				<div className='chat_img'>
					<img
						src='https://ptetutorials.com/images/user-profile.png'
						alt='sunil'
					/>
				</div>
				<div className='chat_ib'>
					<h5>{name}</h5>
					{online ? (
						<span className='text-success'>Online</span>
					) : (
						<span className='text-danger'>Offline</span>
					)}
				</div>
			</div>
		</div>
	);
};

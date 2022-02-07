
import { useContext } from 'react';
import { ChatContext } from '../context';

import { ChatSelect, InboxPeople, Messages } from '../components';


import '../css/chat.css';

export const ChatPage = () => {

	const { chatState } = useContext(ChatContext);

	return (
		<div className='messaging'>
			<div className='inbox_msg'>
				<InboxPeople />

                {
                    (chatState.activeChat)
                    ? <Messages />
                    : <ChatSelect />
                }

			</div>
		</div>
	);
};

import { useContext } from "react";

import { AuthContext, ChatContext } from "../context";

import { IncomingMessage, OutgoingMessage, SendMessage } from ".";
import { IMessage } from '../types/interfaces';


export const Messages = () => {
	
const { chatState } = useContext(ChatContext);
const { auth } = useContext(AuthContext);


	return (
		<div className='mesgs'>
			{/* <!-- History Start --> */}
			<div 
				id="messages"
				className='msg_history'
				>
				{chatState.chats.map((message: IMessage) =>
					(message.to === auth.uid ) ? (
						<IncomingMessage key={message.createdAt} message={ message }/>
					) : (
						<OutgoingMessage key={message.createdAt} message={ message } />
					)
				)}

				{/* <IncomingMessage />

                <OutgoingMessage /> */}
			</div>
			{/* <!-- History End --> */}

			<SendMessage />
		</div>
	);
};

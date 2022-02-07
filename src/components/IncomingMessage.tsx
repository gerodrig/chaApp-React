
import { hourMonth } from "../helpers";
import { IMessage } from "../types/interfaces";

type IncomingMessageProps = {
	message: IMessage;
}

export const IncomingMessage = ({message}: IncomingMessageProps) => {

	const { message: incomingMessage, createdAt } = message;

	return (
		<div className='incoming_msg'>
			<div className='incoming_msg_img'>
				<img
					src='https://ptetutorials.com/images/user-profile.png'
					alt='sunil'
				/>
			</div>
			<div className='received_msg'>
				<div className='received_withd_msg'>
					<p>T{incomingMessage}</p>
					<span className='time_date'>{hourMonth(createdAt as string)}</span>
				</div>
			</div>
		</div>
	);
};

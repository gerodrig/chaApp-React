
import { hourMonth } from "../helpers";
import { IMessage } from "../types/interfaces";

type OutgoingMessageProps = {
	message: IMessage;
}

export const OutgoingMessage = ({message}: OutgoingMessageProps) => {

	const { message: outgoingMessage, createdAt } = message;

	hourMonth(createdAt as string);

	return (
		<div className='outgoing_msg'>
			<div className='sent_msg'>
				<p>{outgoingMessage}</p>
				<span className='time_date'>{hourMonth(createdAt as string)}</span>
			</div>
		</div>
	);
};

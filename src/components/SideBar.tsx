import { useContext } from "react";

import { AuthContext, ChatContext } from "../context";

import { SidebarChatItem } from ".";

import { IUser } from "../types/interfaces";


export const SideBar = () => {

const { chatState } = useContext(ChatContext);

//auth uid and filter users which id is different than auth uid
const { auth } = useContext(AuthContext);

	return (
		<div className='inbox_chat'>

			{
				chatState.users
				.filter((user: IUser) => user.uid !== auth.uid)
				.map( (user: IUser) => (
					<SidebarChatItem key={ user.uid } user={ user } />
				))
			}

			{/* <!-- Extra Space For Scroll --> */}
			<div className='extra_space'></div>
		</div>
	);
};

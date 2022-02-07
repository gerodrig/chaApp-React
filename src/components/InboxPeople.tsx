import { SearchBox, SideBar } from ".";

export const InboxPeople = () => {
	return (
		<>
			{/* <!-- Inbox people Start --> */}
			<div className='inbox_people'>
                <SearchBox />

				<SideBar />
			</div>
			{/* <!-- Inbox People End --> */}
		</>
	);
};

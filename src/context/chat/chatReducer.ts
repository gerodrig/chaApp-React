import { IChatAction, IChatState, IMessage, IUser } from "../../types/interfaces";
import { types } from "../../types/types";


export const chatReducer = (state: IChatState, action: IChatAction): IChatState => {

    switch (action.type) {
        case types.loadedUsers:

            return {
                ...state,
                users: [...action.payload as Array<IUser> ]
            }

        case types.activateChat:
            //if state is equal to the payload, then return the state
            if( state.activeChat === action.payload as string ) return state;

            return {
                ...state,
                activeChat: action.payload as string
            }

        case types.newMessage:

            const newMessage = action.payload as IMessage;
            
            if( state.activeChat === newMessage.from || state.activeChat === newMessage.to ) {
                return {
                    ...state,
                    chats: [...state.chats, action.payload] as IMessage[]
                }
            }

            return {
                ...state,
            }

            case types.loadChatMessages:
                return {
                    ...state,
                    chats: [...action.payload as Array<IMessage> ]
                }
            case types.logout:
                return {
                    ...state,
                    uid: '',
                    activeChat: null, 
                    users: [] as IUser[],  
                    chats: [] as IMessage[], 
                }

        default:
            return state;
    }
}

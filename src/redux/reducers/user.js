import {
  NEW_MESSAGE,
  SET_ACTIVE_CHAT,
  SET_CHATS,
  SET_CHAT_ID,
  SET_CURRENT_ROOM,
  SET_FULL_INFO_FOR_USER,
  SET_HISTORY,
  SET_SOCKET_ID,
  SET_USER_INFO
} from '../actions'

const initialState = {
  userInfo: {
    _id: '',
    name: '',
    email: '',
    avatar: '',
    userSocket: ''
  },
  chats: {
    active: 'online',
    list: {
      chat: {
        chats: [],
        users: []
      }
    },
    chatId: ''
  },
  history: {
    history: []
  },
  allRooms: [],
  room: {
    _id: '',
    messages: [],
    members: []
  }
}

const userReducer = (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          _id: payload
        }
      }
    case SET_CHATS:
      return {
        ...state,
        chats: {
          ...state.chats,
          list: {
            chat: payload
          }
        }
      }
    case SET_ACTIVE_CHAT:
      return {
        ...state,
        chatId: payload
      }
    case SET_HISTORY:
      return {
        ...state,
        history: payload
      }
    case NEW_MESSAGE:
      return {
        ...state,
        newMessage: payload
      }
    case SET_CHAT_ID:
      return {
        ...state,
        chats: {
          ...state.chats,
          chatId: payload
        }
      }
    case SET_SOCKET_ID:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          userSocket: payload
        }
      }
    case SET_FULL_INFO_FOR_USER:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          name: payload.name,
          email: payload.email,
          avatar: payload.avatar
        }
      }
    case SET_CURRENT_ROOM:
      return {
        ...state,
        room: {
          _id: payload._id,
          messages: payload.messages,
          members: payload.members
        }
      }
    default:
      return state
  }
}

export default userReducer

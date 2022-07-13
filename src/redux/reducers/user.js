import {
  NEW_MESSAGE,
  SET_ACTIVE_CHAT,
  SET_CHATS,
  SET_CHAT_ID,
  SET_HISTORY,
  SET_USER_INFO
} from '../actions'

const initialState = {
  userInfo: {
    _id: '',
    name: '',
    email: '',
    avatar: ''
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
  history: []
}

const userReducer = (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: payload
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

    default:
      return state
  }
}

export default userReducer

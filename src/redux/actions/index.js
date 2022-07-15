export const SET_USER_INFO = 'SET_USER_INFO'
export const SET_CHATS = 'SET_CHATS'
export const SET_CONVERSATIONS_INFO = 'SET_CONVERSATIONS_INFO'
export const SET_ACTIVE_CHAT = 'SET_ACTIVE_CHAT'
export const SET_HISTORY = 'SET_HISTORY'
export const NEW_MESSAGE = 'NEW_MESSAGE'
export const SET_CHAT_ID = 'SET_CHAT_ID'
export const SET_SOCKET_ID = 'SET_SOCKET_ID'
export const SET_FULL_INFO_FOR_USER = 'SET_FULL_INFO_FOR_USER'
export const SET_CURRENT_ROOM = 'SET_CURRENT_ROOM'

export const setUserInfo = (user) => {
  return {
    type: SET_USER_INFO,
    payload: user
  }
}

export const setChats = (chat) => {
  return {
    type: SET_CHATS,
    payload: chat
  }
}

export const setActiveChat = (chatId) => {
  return {
    type: SET_ACTIVE_CHAT,
    payload: chatId
  }
}

export const setHistory = (history, chatId) => {
  return {
    type: SET_HISTORY,
    payload: {
      chatId,
      history
    }
  }
}

export const newMessage = (message, chatId) => {
  return {
    type: NEW_MESSAGE,
    payload: {
      chatId,
      message
    }
  }
}

export const setChatIdAction = (chatId) => ({
  type: SET_CHAT_ID,
  payload: chatId
})

export const setSocketIdAction = (socket) => ({
  type: SET_SOCKET_ID,
  payload: socket
})
export const setFullInforForUserAction = (data) => ({
  type: SET_FULL_INFO_FOR_USER,
  payload: data
})
export const setCurrentRoomAction = (room) => ({
  type: SET_CURRENT_ROOM,
  payload: room
})

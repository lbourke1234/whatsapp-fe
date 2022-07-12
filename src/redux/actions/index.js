export const SET_USER_INFO = "SET_USER_INFO";
export const SET_CHATS = "SET_CHATS";
export const SET_CONVERSATIONS_INFO = "SET_CONVERSATIONS_INFO";
export const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";
export const SET_HISTORY = "SET_HISTORY";
export const NEW_MESSAGE = "NEW_MESSAGE";

export const setUserInfo = (user) => {
  return {
    type: SET_USER_INFO,
    payload: user,
  };
};

export const setChats = (chat) => {
  return {
    type: SET_CHATS,
    payload: chat,
  };
};

export const setActiveChat = (chatId) => {
  return {
    type: SET_ACTIVE_CHAT,
    payload: chatId,
  };
};

export const setHistory = (history, chatId) => {
  return {
    type: SET_HISTORY,
    payload: (history = {
      chatId,
      history,
    }),
  };
};

export const newMessage = (message, chatId) => {
  return {
    type: NEW_MESSAGE,
    payload: (message = {
      chatId,
      message,
    }),
  };
};

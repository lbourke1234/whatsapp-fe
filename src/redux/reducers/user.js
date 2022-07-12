import {
  NEW_MESSAGE,
  SET_ACTIVE_CHAT,
  SET_CHATS,
  SET_HISTORY,
  SET_USER_INFO,
} from "../actions";

const initialState = {
  userInfo: {
    _id: "",
    name: "",
    email: "",
    avatar: "",
  },
  chats: {
    active: "",
    list: {
      chat: [],
    },
    chatId: "",
  },
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: payload,
      };
    case SET_CHATS:
      return {
        ...state,
        chats: payload,
      };
    case SET_ACTIVE_CHAT:
      return {
        ...state,
        chatId: payload,
      };
    case SET_HISTORY:
      return {
        ...state,
        history: payload,
      };
    case NEW_MESSAGE:
      return {
        ...state,
        newMessage: payload,
      };

    default:
      return state;
  }
};

export default userReducer;

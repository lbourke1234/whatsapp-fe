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
      messages: [],
    },
  },
  // socket: SocketClient
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;

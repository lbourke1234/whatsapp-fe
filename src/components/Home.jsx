import { useEffect, useState } from "react";
import { Container, Row, Col, ResponsiveEmbed } from "react-bootstrap";
import RightChatBox from "./RightChatBox";
import LeftConversations from "./LeftConversations";
import LeftHeading from "./LeftHeading";
import LeftSearch from "./LeftSearch";
import RightChat from "./RightChat";
import RightHeading from "./RightHeading";
import { io } from "socket.io-client";
import { Message, User } from "../components/types/index.js";
import { useSelector, useDispatch } from "react-redux";
import {
  setChats,
  setHistory,
  setUserInfo,
  setChatIdAction,
  setSocketIdAction,
  setFullInforForUserAction,
  setAllRoomsAction,
} from "../redux/actions";

const ADDRESS = process.env.REACT_APP_Socket_IO_URL;
const socket = io(ADDRESS, { transports: ["websocket"] });

const Home = () => {
  const [localMessages, setLocalMessages] = useState([]);
  const userId = useSelector((state) => state.user.userInfo._id);
  const [room, setRoom] = useState("");
  const [data_Id, setData_Id] = useState("");
  const userHistory = useSelector((state) => state.user.history.history);
  const [isFilled, setIsFilled] = useState(false);

  // THESE ARE USED FOR SOCKET.IO. WE MIGHT REMOVE THEM LATER:
  const [loggedIn, setLoggedIn] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  //********************************************************

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserInfo(data_Id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data_Id]);

  //GETTING TOKEN FROM LOCAL STORAGE ******
  const accessToken = localStorage.getItem("token");
  const accessToken2 = accessToken.substring(1, accessToken.length - 1);

  //GETTING SPECIFIC USER MESSAGE HISTORY AND DISPATCHING IT TO THE REDUX STORE
  let getUserMessageHistory = async () => {
    const response = await fetch(process.env.REACT_APP_HOME_GET_USER_MESSAGES, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken2}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(setHistory(data));
    } else {
      console.log("Something went wrong in the login process.");
    }
  };
  //GETTING SPECIFIC USER ID INFORMATION AND DISPATCHING IT TO THE REDUX STORE
  let getUserIdInformation = async () => {
    const response = await fetch(
      process.env.REACT_APP_HOME_GET_USER_INFORMATION,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken2}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();

      handleUsernameSubmit(data._id);
      setData_Id(data._id);
      dispatch(setFullInforForUserAction(data));
    } else {
      console.log("Something went wrong with setting the User information.");
    }
  };

  //GETTING SPECIFIC CHAT INFORMATION FOR A USER AND DISPATCHING IT TO THE REDUX STORE
  let getChatInformationForUser = async () => {
    const response = await fetch(
      process.env.REACT_APP_HOME_GET_CHAT_INFORMATION,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken2}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      dispatch(setChats(data));
    } else {
      console.log(
        "Something went wrong with setting the CHAT information for the user."
      );
    }
  };

  const fetchAllRoomMessages = async () => {
    const response = await fetch(process.env.REACT_APP_FETCH_ROOM_DATA, {
      headers: {
        Authorization: `Bearer ${accessToken2}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("ALL ROOMS DATA: ", data);
      console.log("DATAA . ROOM:", data[0].room);
      dispatch(setAllRoomsAction(data));
    }
  };

  /* useEffect(() => {
    if (isFilled) {
      const filterHistory = userHistory.filter(
        (history) => history.room !== userHistory.room
      );
      setIsFilled(true);
      console.log("IsFileld: ", isFilled);
      setLocalMessages(filterHistory);
      console.log("Local Messages", localMessages);
      socket.emit("joinRooms", { history: filterHistory });
    }
  }, [userHistory]);
 */
  /* const updateLocalMessages = () => {
    console.log("hello");
    const filterHistory = userHistory.filter(
      (history) => history.room !== userHistory.room
    );
    setLocalMessages(filterHistory);
    console.log("Local Messages:", localMessages);
  }; */

  /* const mappingThroughUserHistory = () => {
    return userHistory.map((history) => socket.join(history.room));
  }; */

  /*   const socket = socket(); */

  // SOCKET IS CONNECTED IN THE COMPONENTDIDMOUNT AND THE REDUX FUNCTIONS ARE CALLED:
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connection established!");
      console.log("Socket ID", ` ${socket.id}!`);
      setRoom(`${socket.id}!`);
      dispatch(setSocketIdAction(socket.id));
    });

    socket.on("loggedin", (onlineUsers) => {
      console.log("logged in successfully!");
      setLoggedIn(true);
      setOnlineUsers(onlineUsers);

      socket.on("newConnection", (onlineUsers) => {
        console.log("a new client just connected!");
        console.log("Online Users:", onlineUsers);
        setOnlineUsers(onlineUsers);
      });
    });
    getUserMessageHistory();
    getUserIdInformation();
    getChatInformationForUser();
    fetchAllRoomMessages();

    socket.on("receivedMessage", ({ sender, room, content }) => {
      console.log("CONTENT", content);
      console.log("sender", sender);
      console.log("room", room);
      /*       localMessages.push(content.text); */
      console.log(" LOCALMESSAGES2:", localMessages);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // SENDING OUR SOCKET IO USERNAME TO THE SOCKET IO BACKEND LISTENER!
  const handleUsernameSubmit = (username) => {
    socket.emit("setUsername", {
      username,
      room,
    });
  };

  /*   socket.emit("message", (bouncedMessage) => { */
  /* setChatHistory((evaluatedChatHistory) => [
      ...evaluatedChatHistory,
      bouncedMessage
    ]) */
  /*  console.log(bouncedMessage);
  }); */

  return (
    <Container fluid className="main-container">
      <Row>
        <Col md={4}>
          <Row className="darker-gray-background left-heading-height">
            <LeftHeading />
          </Row>
          <Row className="mt-1">
            <LeftSearch />
          </Row>
          <hr className="mt-n1" />
          <Row className="left-chats-height">
            <LeftConversations />
          </Row>
        </Col>

        <Col md={8}>
          <Row className="darker-gray-background top-right py-2 right-heading-height">
            <RightHeading />
          </Row>
          <Row className="right-chat-container right-chat-height">
            <RightChat />
          </Row>
          <Row className="darker-gray-background bottom-right chat-box-height">
            <RightChatBox />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

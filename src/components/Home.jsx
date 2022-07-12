import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import RightChatBox from "./RightChatBox";
import LeftConversations from "./LeftConversations";
import LeftHeading from "./LeftHeading";
import LeftSearch from "./LeftSearch";
import RightChat from "./RightChat";
import RightHeading from "./RightHeading";
import { io } from "socket.io-client";
import { Message, User } from "../components/types/index.js";
import { useSelector, useDispatch } from "react-redux";
import { setHistory } from "../redux/actions";

const ADDRESS = process.env.REACT_APP_HOME_URL;

const socket = io(ADDRESS, { transports: ["websocket"] });

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  const dispatch = useDispatch();

  //GETTING TOKEN FROM LOCAL STORAGE ******
  const accessToken = localStorage.getItem("token");
  const accessToken2 = accessToken.substring(1, accessToken.length - 1);

  //GETTING SPECIFIC USER INFORMATION
  let getUserInfo = async () => {
    const response = await fetch(process.env.REACT_APP_HOME_GET_USER_MESSAGES, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken2}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      dispatch(setHistory(data));
    } else {
      console.log("Something went wrong in the login process.");
    }
  };

  // SOCKET ON BELOW :
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connection established!");
    });

    socket.on("loggedin", (onlineUsers) => {
      console.log("logged in successfully!");
      setLoggedIn(true);
      setOnlineUsers(onlineUsers);

      socket.on("newConnection", (onlineUsers) => {
        console.log("a new client just connected!");
        setOnlineUsers(onlineUsers);
      });

      socket.emit("message", (bouncedMessage) => {
        setChatHistory((evaluatedChatHistory) => [
          ...evaluatedChatHistory,
          bouncedMessage,
        ]);
      });
    });
    getUserInfo();
  }, []);

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

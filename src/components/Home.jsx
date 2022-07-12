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

const ADDRESS = process.env.REACT_APP_HOME_URL;

const socket = io(ADDRESS, { transports: ["websocket"] });

const Home = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [room, setRoom] = useState("blue");

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

        // console.log('a new challenger appears!')
        // fetchOnlineUsers()
        setOnlineUsers(onlineUsers);
      });

      socket.emit("message", (bouncedMessage) => {
        setChatHistory((evaluatedChatHistory) => [
          ...evaluatedChatHistory,
          bouncedMessage,
        ]);
      });
    });
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

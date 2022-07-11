import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  ListGroup,
  Button,
} from "react-bootstrap";
import { io } from "socket.io-client";
import { Message, User } from "../components/types/index.js";

const ADDRESS = "http://localhost:3001";
const socket = io(ADDRESS, { transports: ["websocket"] });

const DashboardPage = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [room, setRoom] = useState("blue");

  useEffect(() => {
    // this code will be executed just once!
    // we need to set up our event listeners just once!
    // ...so we're going to put them here :)
    socket.on("connect", () => {
      // the server emits an event of type 'connect' every time a client
      // successfully established a connection
      console.log("Connection established!");
    });

    // let's now listen for another type of event, 'loggedin'
    // this should happen once AFTER sending our username
    socket.on("loggedin", (onlineUsers) => {
      console.log("logged in successfully!");
      setLoggedIn(true);
      setOnlineUsers(onlineUsers);
      // fetchOnlineUsers()

      // I moved this newConnection event listener in the loggedin one,
      // since I don't want this "trap" to be set from the first moment
      socket.on("newConnection", (onlineUsers) => {
        console.log("a new client just connected!");
        // console.log('a new challenger appears!')
        // fetchOnlineUsers()
        setOnlineUsers(onlineUsers);
      });

      socket.on("message", (bouncedMessage) => {
        setChatHistory((evaluatedChatHistory) => [
          ...evaluatedChatHistory,
          bouncedMessage,
        ]);
        // looks like the one receiving this 'message' event is appending
        // the last message to an empty chatHistory...?
        // we can fix this using the second overload of the setState function,
        // passing a callback carrying the up-to-date value and returning
        // the new chatHistory
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUsernameSubmit = () => {
    // let's send our username to the server!
    // this time it's our turn to EMIT an EVENT to the server
    // we need to emit an event of type 'setUsername', since this is
    // the type of the event the server is already listening for
    socket.emit("setUsername", {
      username: username,
      room,
    });
    // after sending our username from the client,
    // if everything goes well the backend will emit us back another event
    // called 'loggedin' <-- this concludes the login process and puts us
    // in the online users list
  };

  const sendMessage = () => {
    // this function executes just for the sender for the message!
    const newMessage = {
      text: message,
      sender: username,
      createdAt: new Date().toLocaleString("en-US"),
    };

    socket.emit("sendmessage", { message: newMessage, room });
    setChatHistory([...chatHistory, newMessage]);
    // this is appending my new message to the chat history in this very moment
    setMessage("");
  };

  const toggleRoom = () => {
    setRoom((room) => (room === "blue" ? "red" : "blue"));
  };

  const getRoomHistory = async () => {
    const response = await fetch(`${ADDRESS}/rooms/${room}/messages`);

    const messages = await response.json();

    setChatHistory(messages);
  };

  useEffect(() => {
    console.log("Room changed, current room is ", room);
    socket.on("loggedin", getRoomHistory); // add the event listener

    return () => {
      socket.off("loggedin", getRoomHistory); // remove the event listener
    };
  }, [room]);

  return (
    <Container fluid>
      <Row style={{ height: "95vh" }} className="my-3">
        <Col md={9} className="d-flex flex-column justify-content-between">
          {/* LEFT COLUMN */}
          {/* TOP AREA: USERNAME INPUT FIELD */}
          {/* {!loggedIn && ( */}
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleUsernameSubmit();
            }}
          >
            <FormControl
              placeholder="Set your username here"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loggedIn}
            />
            <Button
              variant={room === "blue" ? "primary" : "danger"}
              onClick={toggleRoom}
            >
              Switch Room
            </Button>
          </Form>
          {/* )} */}
          {/* MIDDLE AREA: CHAT HISTORY */}
          <ListGroup>
            {/*  {chatHistory &&
              chatHistory.map((element, i) => (
                <ListGroup.Item key={i}>
                  {element.sender} | {element.text} at{" "}
                  {new Date(element.createdAt).toLocaleTimeString("en-US")}
                </ListGroup.Item>
              ))} */}
          </ListGroup>
          {/* BOTTOM AREA: NEW MESSAGE */}
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <FormControl
              placeholder="Write your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={!loggedIn}
            />
          </Form>
        </Col>
        <Col md={3}>
          {/* ONLINE USERS SECTION */}
          <div className="mb-3">Connected users:</div>
          {onlineUsers.length === 0 && (
            <ListGroup.Item>Log in to check who's online!</ListGroup.Item>
          )}
          <ListGroup>
            {onlineUsers.map((user) => (
              <ListGroup.Item key={user.id} style={{ color: user.room }}>
                {user.username}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;

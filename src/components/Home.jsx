import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import RightChatBox from './RightChatBox'
import LeftConversations from './LeftConversations'
import LeftHeading from './LeftHeading'
import LeftSearch from './LeftSearch'
import RightChat from './RightChat'
import RightHeading from './RightHeading'
import { io } from 'socket.io-client'
import { Message, User } from '../components/types/index.js'

const ADDRESS = 'http://localhost:5001'
const socket = io(ADDRESS, { transports: ['websocket'] })

const Home = () => {
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [chatHistory, setChatHistory] = useState([])
  const [room, setRoom] = useState('blue')

  useEffect(() => {
    // this code will be executed just once!
    // we need to set up our event listeners just once!
    // ...so we're going to put them here :)
    socket.on('connect', () => {
      // the server emits an event of type 'connect' every time a client
      // successfully established a connection
      console.log('Connection established!')
    })

    // let's now listen for another type of event, 'loggedin'
    // this should happen once AFTER sending our username
    socket.on('loggedin', (onlineUsers) => {
      console.log('logged in successfully!')
      setLoggedIn(true)
      setOnlineUsers(onlineUsers)
      // fetchOnlineUsers()

      // I moved this newConnection event listener in the loggedin one,
      // since I don't want this "trap" to be set from the first moment
      socket.on('newConnection', (onlineUsers) => {
        console.log('a new client just connected!')
        // console.log('a new challenger appears!')
        // fetchOnlineUsers()
        setOnlineUsers(onlineUsers)
      })

      socket.on('message', (bouncedMessage) => {
        setChatHistory((evaluatedChatHistory) => [
          ...evaluatedChatHistory,
          bouncedMessage
        ])
        // looks like the one receiving this 'message' event is appending
        // the last message to an empty chatHistory...?
        // we can fix this using the second overload of the setState function,
        // passing a callback carrying the up-to-date value and returning
        // the new chatHistory
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
  )
}

export default Home

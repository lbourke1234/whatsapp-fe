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
import { useSelector, useDispatch } from 'react-redux'
import { setChats, setHistory, setUserInfo, setChatIdAction } from '../redux/actions'

const ADDRESS = process.env.REACT_APP_Socket_IO_URL
const socket = io(ADDRESS, { transports: ['websocket'] })

const Home = () => {
  const userId = useSelector((state) => state.user.userInfo._id)
  const [room, setRoom] = useState('')

  // THESE ARE USED FOR SOCKET.IO. WE MIGHT REMOVE THEM LATER:
  const [loggedIn, setLoggedIn] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [chatHistory, setChatHistory] = useState([])
  //********************************************************

  const dispatch = useDispatch()

  //GETTING TOKEN FROM LOCAL STORAGE ******
  const accessToken = localStorage.getItem('token')
  const accessToken2 = accessToken.substring(1, accessToken.length - 1)

  //GETTING SPECIFIC USER MESSAGE HISTORY AND DISPATCHING IT TO THE REDUX STORE
  let getUserMessageHistory = async () => {
    const response = await fetch(process.env.REACT_APP_HOME_GET_USER_MESSAGES, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken2}`
      }
    })
    if (response.ok) {
      const data = await response.json()
      console.log('DATA: ', data)
      dispatch(setHistory(data))
    } else {
      console.log('Something went wrong in the login process.')
    }
  }
  //GETTING SPECIFIC USER ID INFORMATION AND DISPATCHING IT TO THE REDUX STORE
  let getUserIdInformation = async () => {
    const response = await fetch(process.env.REACT_APP_HOME_GET_USER_INFORMATION, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken2}`
      }
    })
    if (response.ok) {
      const data = await response.json()
      console.log('USER DATA: ', data)
      dispatch(setUserInfo(data))
    } else {
      console.log('Something went wrong with setting the User information.')
    }
  }

  //GETTING SPECIFIC CHAT INFORMATION FOR A USER AND DISPATCHING IT TO THE REDUX STORE
  let getChatInformationForUser = async () => {
    const response = await fetch(process.env.REACT_APP_HOME_GET_CHAT_INFORMATION, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken2}`
      }
    })
    if (response.ok) {
      const data = await response.json()
      console.log('CHAT DATA: ', data)
      dispatch(setChats(data))
    } else {
      console.log('Something went wrong with setting the CHAT information for the user.')
    }
  }

  // SOCKET IS CONNECTED IN THE COMPONENTDIDMOUNT AND THE REDUX FUNCTIONS ARE CALLED:
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connection established!')
      console.log('Socket ID', ` ${socket.id}!`)
      setRoom(`${socket.id}!`)
      dispatch(setChatIdAction(socket.id))
    })

    socket.on('loggedin', (onlineUsers) => {
      console.log('logged in successfully!')
      setLoggedIn(true)
      setOnlineUsers(onlineUsers)

      socket.on('newConnection', (onlineUsers) => {
        console.log('a new client just connected!')
        console.log('Online Users:', onlineUsers)
        setOnlineUsers(onlineUsers)
      })

      socket.emit('message', (bouncedMessage) => {
        setChatHistory((evaluatedChatHistory) => [
          ...evaluatedChatHistory,
          bouncedMessage
        ])
      })
    })
    getUserMessageHistory()
    getUserIdInformation()
    getChatInformationForUser()
    handleUsernameSubmit()
  }, [])

  // SENDING OUR SOCKET IO USERNAME TO THE SOCKET IO BACKEND LISTENER!
  const handleUsernameSubmit = () => {
    socket.emit('setUsername', {
      username: userId,
      room
    })
  }

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

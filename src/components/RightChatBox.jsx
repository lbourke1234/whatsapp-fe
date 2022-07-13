import { Col, Form } from 'react-bootstrap'
import { AiOutlineSmile } from 'react-icons/ai'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { AiFillSound } from 'react-icons/ai'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newMessage } from '../redux/actions'

const RightChatBox = () => {
  const accessToken = localStorage.getItem('token')
  const accessToken2 = accessToken.substring(1, accessToken.length - 1)
  const dispatch = useDispatch()
  const room = useSelector((state) => state.user.chats.chatId)
  const userInfo = useSelector((state) => state.user.userInfo)
  const [message, setMessage] = useState('')
  const [fullMessage, setFullMessage] = useState({
    sender: '',
    room: '',
    content: {
      text: ''
    }
  })
  const handleSubmit = async (e) => {
    e.preventDefault()

    setFullMessage({
      sender: userInfo._id,
      room,
      content: {
        text: message
      }
    })

    const response = await fetch(process.env.REACT_APP_HOME_GET_USER_MESSAGES, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken2}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(fullMessage)
    })
    const body = await response.json()
    console.log(body)
  }
  return (
    <>
      <Col md={1} className="d-flex justify-content-between align-items-center">
        {console.log('USER INFO RIGHT CHAT', userInfo)}
        <AiOutlineSmile />
        <AiOutlinePaperClip />
      </Col>
      <Col md={10} className="pt-3">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Type a message"
              onChange={(e) =>
                setFullMessage({
                  sender: userInfo._id,
                  room,
                  content: {
                    text: e.target.value
                  }
                })
              }
            />
          </Form.Group>
        </Form>
      </Col>
      <Col md={1} className="d-flex justify-content-center align-items-center">
        <AiFillSound />
      </Col>
    </>
  )
}
export default RightChatBox

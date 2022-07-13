import { Col, Form } from 'react-bootstrap'
import { AiOutlineSmile } from 'react-icons/ai'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { AiFillSound } from 'react-icons/ai'
import { setState } from 'react'

const RightChatBox = () => {
  const [message, setMessage] = setState('')
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <Col md={1} className="d-flex justify-content-between align-items-center">
        <AiOutlineSmile />
        <AiOutlinePaperClip />
      </Col>
      <Col md={10} className="pt-3">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Type a message"
              onChange={(e) => setMessage(e.target.value)}
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

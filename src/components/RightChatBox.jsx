import { Col, Form } from 'react-bootstrap'
import { AiOutlineSmile } from 'react-icons/ai'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { AiFillSound } from 'react-icons/ai'

const RightChatBox = () => {
  return (
    <>
      <Col md={1} className="d-flex justify-content-between align-items-center">
        <AiOutlineSmile />
        <AiOutlinePaperClip />
      </Col>
      <Col md={10} className="pt-3">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Type a message" />
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

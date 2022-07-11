import { Row, Col, Form } from 'react-bootstrap'
import { AiFillSmile } from 'react-icons/ai'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { AiFillSound } from 'react-icons/ai'

const RightChatBox = () => {
  return (
    <Row>
      <Col md={2}>
        <AiFillSmile />
        <AiOutlinePaperClip />
      </Col>
      <Col md={8}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
        </Form>
      </Col>
      <Col md={2}>
        <AiFillSound />
      </Col>
    </Row>
  )
}
export default RightChatBox

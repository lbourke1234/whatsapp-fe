import { Row, Col } from 'react-bootstrap'

const SingleChat = () => {
  return (
    <Col md={12} className="my-2 px-5 single-chat-container">
      <Row>Name of Sender</Row>
      <Row>
        <span>Conversation goes here</span>
        <span className="ml-auto pr-3">time</span>
      </Row>
    </Col>
  )
}
export default SingleChat

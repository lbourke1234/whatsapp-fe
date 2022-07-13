import { Row, Col } from 'react-bootstrap'

const SingleChat = ({ chat }) => {
  return (
    <Col md={12} className="my-2 px-5 single-chat-container">
      {console.log(chat)}
      <Row>{chat.sender}</Row>
      <Row>
        <span className="conversation-text">{chat.content.text}</span>
        <span className="ml-auto pr-3">{chat.updatedAt}</span>
      </Row>
    </Col>
  )
}
export default SingleChat

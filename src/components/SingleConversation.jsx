import { Col, Row } from 'react-bootstrap'

const SingleConversation = ({ chat }) => {
  return (
    <>
      <Col md={2} className="d-flex justify-content-center align-items-center">
        <img className="profile-image" src={chat.content.media} alt="kitten"></img>
      </Col>
      <Col md={10}>
        <Row>
          <Col md={10}>
            <span className="conversation-name">{chat.sender}</span>
          </Col>
          <Col md={2}>
            <span className="day">{chat.createdAt}</span>
          </Col>
        </Row>
        <Row>
          <span className="pl-3 chat-preview">{chat.content.text}</span>
        </Row>
        <hr></hr>
      </Col>
    </>
  )
}
export default SingleConversation

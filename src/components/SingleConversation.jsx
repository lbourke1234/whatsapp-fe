import { Col, Row } from 'react-bootstrap'

const SingleConversation = () => {
  return (
    <>
      <Col md={2} className="d-flex justify-content-center align-items-center">
        <img
          className="profile-image"
          src="http://placekitten.com/200/300"
          alt="kitten"
        ></img>
      </Col>
      <Col md={10}>
        <Row>
          <Col md={10}>
            <span className="conversation-name">Conversation Name Here</span>
          </Col>
          <Col md={2}>
            <span className="day">Yesterday</span>
          </Col>
        </Row>
        <Row>
          <span className="pl-3 chat-preview">Preview of chat goes here</span>
        </Row>
        <hr></hr>
      </Col>
    </>
  )
}
export default SingleConversation

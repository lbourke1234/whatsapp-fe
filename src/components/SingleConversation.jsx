import { Col, Row } from 'react-bootstrap'
import { AiOutlineLeftCircle } from 'react-icons/ai'

const SingleConversation = () => {
  return (
    <>
      <Col md={2} className="d-flex justify-content-center align-items-center">
        <AiOutlineLeftCircle className="ai-outline-left-circle" />
      </Col>
      <Col md={10}>
        <Row>
          <Col md={10}>
            <span>Conversation Name Here</span>
          </Col>
          <Col md={2}>
            <span className="day">Yesterday</span>
          </Col>
        </Row>
        <Row>
          <span className="pl-3">Preview of chat goes here</span>
        </Row>
      </Col>
    </>
  )
}
export default SingleConversation

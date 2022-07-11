import { Col, Row } from 'react-bootstrap'
import { AiOutlineLeftCircle } from 'react-icons/ai'

const SingleConversation = () => {
  return (
    <>
      <Col md={2} className="d-flex justify-content-center align-items-center">
        <AiOutlineLeftCircle />
      </Col>
      <Col md={10}>
        <Row>
          <Col md={10}>
            <span>Conversaiton Name Here</span>
          </Col>
          <Col md={2}>
            <span>Day</span>
          </Col>
        </Row>
        <Row>
          <span>Preview of chat goes here</span>
        </Row>
      </Col>
    </>
  )
}
export default SingleConversation

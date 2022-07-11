import { Row, Col } from 'react-bootstrap'

const SingleChat = () => {
  return (
    <Col>
      <Row>Name of Sender</Row>
      <Row>
        <span>Conversaiton goes here</span>
        <span className="ml-auto mr-5">time</span>
      </Row>
    </Col>
  )
}
export default SingleChat

import { Container, Row, Col } from 'react-bootstrap'
import { AiFillCheckCircle } from 'react-icons/ai'
import { AiOutlineLeftCircle } from 'react-icons/ai'
import { AiOutlineMore } from 'react-icons/ai'
import { AiOutlinePlus } from 'react-icons/ai'

const LeftHeading = () => {
  return (
    <Container fluid>
      <Row className="py-3">
        <Col>
          <AiFillCheckCircle />
        </Col>

        <Col className="d-flex justify-content-end">
          <AiOutlineLeftCircle className="mr-5" />

          <AiOutlinePlus className="mr-5" />

          <AiOutlineMore className="mr-4" />
        </Col>
      </Row>
    </Container>
  )
}
export default LeftHeading

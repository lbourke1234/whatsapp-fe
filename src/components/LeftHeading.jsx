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
          <AiFillCheckCircle className="left-heading-icons" />
        </Col>

        <Col className="d-flex justify-content-end">
          <AiOutlineLeftCircle className="mr-5 left-heading-icons" />

          <AiOutlinePlus className="mr-5 left-heading-icons" />

          <AiOutlineMore className="mr-4 left-heading-icons" />
        </Col>
      </Row>
    </Container>
  )
}
export default LeftHeading

import { Row, Col } from 'react-bootstrap'
import { AiOutlineLeftCircle } from 'react-icons/ai'
import { AiOutlineMinus } from 'react-icons/ai'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { AiOutlineSearch } from 'react-icons/ai'

const RightHeading = () => {
  return (
    <>
      <Col md={2} className="d-flex align-items-center pl-5 top-right-heading-icons">
        <AiOutlineLeftCircle />
      </Col>
      <Col md={8}>
        <Row>
          <Col>
            <span>Conversation Name Here</span>
          </Col>
        </Row>
        <Row>
          <span>Map through people in chat</span>
        </Row>
      </Col>
      <Col className="d-flex justify-content-center align-items-center">
        <AiOutlineMinus className="mr-3 top-right-heading-icons" />
        <AiOutlineSearch className="mr-3 top-right-heading-icons" />
        <AiOutlineEllipsis className="mr-5 top-right-heading-icons" />
      </Col>
    </>
  )
}
export default RightHeading

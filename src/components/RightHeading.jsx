import { Row, Col } from 'react-bootstrap'
import { AiOutlineMinus } from 'react-icons/ai'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { AiOutlineSearch } from 'react-icons/ai'
import { useSelector } from 'react-redux'

const RightHeading = () => {
  const userInfo = useSelector((state) => state.user.userInfo)
  return (
    <>
      <Col md={2} className="d-flex align-items-center pl-5 top-right-heading-icons">
        <img className="heading-profile-image" src={userInfo.avatar} alt="kitten"></img>
      </Col>
      <Col md={8}>
        <Row>
          <Col>
            <span className="conversation-name">Conversation Name Here</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="chat-preview">Map through people in chat</span>
          </Col>
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

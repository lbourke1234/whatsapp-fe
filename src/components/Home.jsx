import { Container, Row, Col } from 'react-bootstrap'
import RightChatBox from './RightChatBox'
import LeftConversations from './LeftConversations'
import LeftHeading from './LeftHeading'
import LeftSearch from './LeftSearch'
import RightChat from './RightChat'
import RightHeading from './RightHeading'

const Home = () => {
  return (
    <Container fluid className="m-4 main-container">
      <Row>
        <Col md={5}>
          <Row>
            <LeftHeading />
          </Row>
          <Row>
            <LeftSearch />
          </Row>
          <Row>
            <LeftConversations />
          </Row>
        </Col>

        <Col md={7}>
          <Row>
            <RightHeading />
          </Row>
          <Row>
            <RightChat />
          </Row>
          <Row>
            <RightChatBox />
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Home

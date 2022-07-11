import { Container, Row, Col } from 'react-bootstrap'
import RightChatBox from './RightChatBox'
import LeftConversations from './LeftConversations'
import LeftHeading from './LeftHeading'
import LeftSearch from './LeftSearch'
import RightChat from './RightChat'
import RightHeading from './RightHeading'

const Home = () => {
  return (
    <Container fluid className="main-container">
      <Row>
        <Col md={4}>
          <Row className="darker-gray-background">
            <LeftHeading />
          </Row>
          <Row className="mt-1">
            <LeftSearch />
          </Row>
          <Row>
            <LeftConversations />
          </Row>
        </Col>

        <Col md={8}>
          <Row className="darker-gray-background top-right py-2">
            <RightHeading />
          </Row>
          <Row className="right-chat-container">
            <RightChat />
          </Row>
          <Row className="darker-gray-background bottom-right">
            <RightChatBox />
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Home

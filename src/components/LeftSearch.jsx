import { Form, Col } from 'react-bootstrap'
// import { AiOutlineSearch } from 'react-icons/ai'
import { AiOutlineFilter } from 'react-icons/ai'

const LeftSearch = () => {
  return (
    <>
      <Col md={11}>
        <Form>
          <Form.Group className="mb-3">
            {/* <AiOutlineSearch /> */}
            <Form.Control type="text" placeholder="Search or start a new chat" />
          </Form.Group>
        </Form>
      </Col>
      <Col md={1}>
        <AiOutlineFilter />
      </Col>
    </>
  )
}
export default LeftSearch

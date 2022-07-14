import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

let SignUpPage = () => {
  const [passwordInput, setPasswordInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [checkBoxClicked, setCheckboxClicked] = useState(false)
  let navigate = useNavigate()

  const registerUrl = process.env.REACT_APP_REGISTER_URL

  const bodyData = {
    email: emailInput,
    password: passwordInput,
    name: nameInput
  }

  const fetchData = async () => {
    let response = await fetch(registerUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    })
    if (response.ok) {
      let data = await response.json()
      console.log(data)
      navigate('/login')
    } else {
      console.log('Something went wrong during registration.')
    }
  }

  const onSubmitFunction = (event) => {
    event.preventDefault()
    fetchData()
  }

  let checkBoxFunction = (event) => {
    console.log('CheckBox clicked', event.target.value)
    setCheckboxClicked(!checkBoxClicked)
  }

  return (
    <Container>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6} className="m-auto">
          <Form onSubmit={onSubmitFunction}>
            <h1 className="mt-5">SIGN UP</h1>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(event) => {
                  setNameInput(event.target.value)
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mt-4">
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(event) => {
                  setEmailInput(event.target.value)
                }}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(event) => {
                  setPasswordInput(event.target.value)
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="I've read and agree to the Terms and Conditions"
                onChange={checkBoxFunction}
              />
            </Form.Group>
            {checkBoxClicked === true ? (
              <Button variant="success" type="submit" size="lg">
                Sign up now
              </Button>
            ) : (
              <Button variant="success" type="submit" size="lg" disabled>
                Sign up now
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default SignUpPage

import { Container, Row, Form, Button, Col } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [emailFromInput, setEmailFromInput] = useState("");
  const [passwordFromInput, setPasswordFromInput] = useState("");

  const loginUrl = process.env.REACT_APP_LOGIN_URL;
  const token = window.localStorage.getItem("token");

  let navigate = useNavigate();

  const bodyData = {
    email: emailFromInput,
    password: passwordFromInput,
  };

  let loginFetch = async () => {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyData),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      let accessToken = data.accessToken;
      console.log("ACCESSTOKEN:", accessToken);
      localStorage.setItem("token", JSON.stringify(accessToken));
      navigate("/");
    } else {
      console.log("Something went wrong in the login process.");
    }
  };

  const onSubmitFunction = (event) => {
    event.preventDefault();
    loginFetch();
  };

  return (
    <Container className="new-login-container">
      <Row>
        <Col xs={12} sm={12} md={6} lg={6} className="m-auto">
          <h1 className="mt-5">LOGIN</h1>
          <Form onSubmit={onSubmitFunction}>
            <Form.Group controlId="formBasicEmail" className="mt=4">
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(event) => {
                  setEmailFromInput(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(event) => {
                  setPasswordFromInput(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox"></Form.Group>
            <Button variant="success" type="submit" size="lg">
              Login
            </Button>
          </Form>
          <p className="mt-3 bottom-text">
            Don't have an account? <a href="/signup">Signup now.</a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};
export default LoginPage;

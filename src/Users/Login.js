import React from 'react'
import { Form, Button } from 'react-bootstrap'

const Login = () => {
    return (
        <div className = "container col-md-6 offset-md-4 col-lg-4 offset-lg-4" >
            <div className = "display-4 my-3">Login</div>
            <div className = "card">
                <div className = "card-body">
                <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit" className = "float-right">
                    Submit
                </Button>
                </Form>
                </div>
                </div>
        </div>
    )
}

export default Login;
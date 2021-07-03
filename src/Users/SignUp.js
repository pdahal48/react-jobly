import React from 'react'
import { Form, Button } from 'react-bootstrap'

const SignUp = () => {
    return (
        <div className = "container col-md-6 offset-md-3 col-lg-4 offset-lg-4" >
            <div className = "display-4 my-3">Sign Up</div>
            <div className = "card">
                <div className = "card-body">
                <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" />
                </Form.Group> 
                <Form.Group>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" />
                </Form.Group>                    
                <Form.Group >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
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

export default SignUp;
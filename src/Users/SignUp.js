import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router'

const SignUp = ({signup}) => {
    const history = useHistory();

    const INITIAL_DATA = ({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [singUpFormData, setsignUpFormData] = useState(INITIAL_DATA);

    async function handleSubmit(e) {
        e.preventDefault()
        let user = await signup({...singUpFormData})
        if(user.success){
            history.push("/companies");
        } else {
           return alert(user.errors)
        }
}

    const handleChange = (e) => {
        const {name, value} = e.target
        setsignUpFormData(data => ({
            ...data,
            [name]: value
        }))
    }


    return (
        <div>
            <div className = "container col-md-6 offset-md-3 col-lg-4 offset-lg-4" >
            <div className = "display-4 my-3">Sign Up</div>
            <div className = "card">
                <div className = "card-body">
                <Form onSubmit = {handleSubmit}>
                <Form.Label htmlFor = "username"/>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text"
                        name = "username"
                        placeholder="Username"
                        value= {singUpFormData.username}
                        onChange = {handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>First name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name = "firstName"
                        placeholder="First Name" 
                        value= {singUpFormData.firstName}
                        onChange = {handleChange}
                    />
                </Form.Group> 
                <Form.Group>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control 
                        type="text"
                        name = "lastName"
                        placeholder="Last Name"
                        value= {singUpFormData.lastName}
                        onChange = {handleChange}
                    />
                </Form.Group>                    
                <Form.Group >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email"
                        name = "email"
                        placeholder="Enter email"
                        value= {singUpFormData.email}
                        onChange = {handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password"
                        name = "password"
                        placeholder="Password"
                        value= {singUpFormData.password}
                        onChange = {handleChange} 
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className = "float-right">
                    Submit
                </Button>
                </Form>
                </div>
                </div>
        </div>
        </div>
    )
}

export default SignUp;
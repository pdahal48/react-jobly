import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'


const Login = ({ loginUser }) => {

    const history = useHistory()
    const [loginFormData, setloginFormData] = useState({
        username: "",
        password: ""
    });

    async function handleSubmit(e) {
            e.preventDefault()
            let user = await loginUser(loginFormData)
            if(user.success){
                history.push('/companies')
                window.location.reload()
            } else {
                return console.log(user.errors)
            }
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setloginFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    return (
        <div className = "container col-md-6 offset-md-4 col-lg-4 offset-lg-4" >
            <div className = "display-4 my-3">Login</div>
            <div className = "card">
                <div className = "card-body">
                <Form onSubmit = {handleSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        name = "username"
                        placeholder="Username"
                        value = {loginFormData.username}
                        onChange = {handleChange}
                        />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password"
                        name = "password"
                        placeholder="Password"
                        value = {loginFormData.password}
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
    )
}

export default Login;
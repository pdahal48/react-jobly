import React, {useState, useContext} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router'
import {JoblyApi as API} from '../backend/helpers/api'
import UserContext from './UserContext'

const Login = () => {
    const INITIAL_DATA = ({
        username: "",
        password: ""
    })

    const [loginFormData, setloginFormData] = useState(INITIAL_DATA);
    const History = useHistory()
    const {currentUser, setCurrUserToken} = useContext(UserContext)

    const handleChange = (e) => {
        const {name, value} = e.target
        setloginFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
            e.preventDefault()
            let user = await API.login({...loginFormData})
            if(!user.token){
                return alert(user.message)
            } else {
                setCurrUserToken(user.token);
                History.push('/')
                window.location.reload()
            }
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
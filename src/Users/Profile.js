import react, {useEffect, useState, useContext} from 'react'
import {JoblyApi as API} from '../backend/helpers/api'
import userContext from './UserContext'
import jwt from 'jsonwebtoken'
import { Form, Button } from 'react-bootstrap'


const Profile = () => {

    const currUserToken = useContext(userContext)

    const [usern, setUsername] = useState()
    const [currentUser, setCurrentUser] = useState(null)
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const INITIAL_DATA = ({

        username: usern,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: ""
      })

    const [singUpFormData, setsignUpFormData] = useState(INITIAL_DATA);

    const handleChange = (e) => {
            const {name, value} = e.target
            setsignUpFormData(data => ({
                ...data,
                [name]: value
            }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let user = await API.register({...singUpFormData})
        if(!user.token){
            return alert(user.message)
        } else {
            // setUser(user.token);
            // History.push('/')
            // window.location.reload()
            console.log('form submitted')
        }
}


    // const [formData, setFormData] = useState({
    //     firstName: currUser.firstName,
    //     lastName: currUser.lastName,
    //     email: currUser.email,
    //     username: currUser.username,
    //     password: ""
    // })

    useEffect(() => {
        async function getUserInfo(){
            let { username } = jwt.decode(currUserToken)
            API.token = currUserToken

            let currentUser = await API.get(username)
            setCurrentUser(currentUser.user)
            setUsername(currentUser.user.username)
            setFirstName(currentUser.user.firstName)
            setLastName(currentUser.user.lastName)
            setEmail(currentUser.user.email)
        }
        getUserInfo()
    }, [])

    return (
        <div>
            {(currUserToken !== null) ?
             <div className = "container col-md-6 offset-md-3 col-lg-4 offset-lg-4" >
             <div className = "display-4 my-3">Sign Up</div>
             <div className = "card">
                 <div className = "card-body">
                 <Form onSubmit = {handleSubmit}>
                 <Form.Label htmlFor = "username"> Username</Form.Label>
                 <p className = "plaintext"> <b>{usern}</b></p>
                 <Form.Group>
                     <Form.Label>First name</Form.Label>
                     <Form.Control 
                         type="text" 
                         name = "firstName"
                         placeholder="First Name" 
                         value= {firstName}
                         onChange = {handleChange}
                     />
                 </Form.Group> 
                 <Form.Group>
                     <Form.Label>Last name</Form.Label>
                     <Form.Control 
                         type="text"
                         name = "lastName"
                         placeholder="Last Name"
                         value= {lastName}
                         onChange = {handleChange}
                     />
                 </Form.Group>                    
                 <Form.Group >
                     <Form.Label>Email address</Form.Label>
                     <Form.Control 
                         type="email"
                         name = "email"
                         placeholder="Enter email"
                         value= {email}
                         onChange = {handleChange}
                     />
                 </Form.Group>
                 <Form.Group>
                     <Form.Label>Password</Form.Label>
                     <Form.Control 
                         type="password"
                         name = "password"
                         placeholder="Password"
                         value= {password}
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
            : 
            (
            <div>
                History.go('/')
            </div>
            )
            }
        </div>
    )
}

export default Profile;
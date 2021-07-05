import react, {useEffect, useState} from 'react'
import {JoblyApi as API} from './backend/helpers/api'

const Home = () => {
    const [currUser, setCurrUser] = useState([])

    useEffect(() => {
        async function getUser() {
            const newUser = await API.get('pdahal31')
            setCurrUser(newUser)
            console.log('New user is ' + newUser.user.firstName)
        }
        getUser()
    }, [])

    return (
        <div>
           {currUser != null ? `Welcome ${currUser.user.firstName}` : "Hello"}
        </div>

    )
}

export default Home;
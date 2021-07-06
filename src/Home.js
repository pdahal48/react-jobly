import react, {useEffect, useState, useContext} from 'react'
import {JoblyApi as API} from './backend/helpers/api'
import userContext from './Users/UserContext'
import jwt from 'jsonwebtoken'


const Home = () => {

    const currUserToken = useContext(userContext)
    const [userName, setUserName] = useState(null)

    useEffect(() => {
        async function getUserInfo(){
            let { username } = jwt.decode(currUserToken)
            setUserName(username)
        }
        getUserInfo()
    }, [])

    return (
        <div className="pt-5">
       <div className="homepage" >
           <div className = "container text-center">
           <h1 className="display-4">Jobly</h1>
            <p className="lead">All the jobs in one, convenient place</p>
           {
                currUserToken !== undefined ? <h2>Welcome back, {userName}</h2> : 
                <div className="mt-3">
                    <a className="btn btn-primary font-weight-bold mr-3" href="/login">Login</a>
                    <a className="btn btn-primary font-weight-bold" href="/signup">Sign Up</a>
                </div>
            }
           </div>
        </div>
        </div>
    )
}

export default Home;
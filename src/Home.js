import { useContext } from 'react'
import userContext from './Users/UserContext'

const Home = () => {
    const { currentUser } = useContext(userContext)
    return (
        <div className="pt-5">
       <div className="homepage" >
           <div className = "container text-center">
           <h1 className="display-4">Jobly</h1>
            <p className="lead">All the jobs in one, convenient place</p>
           {currentUser ? <h2>Welcome back, {currentUser.firstName} </h2> : 
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
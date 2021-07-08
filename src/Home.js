import { useContext } from 'react'
import UserContext from './Users/UserContext'
import { Link } from "react-router-dom";


const Home = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <div className="pt-5">
       <div className="homepage" >
           <div className = "container text-center">
           <h1 className="display-4">Jobly</h1>
           <p className="lead">All the jobs in one, convenient place</p>
           {currentUser ?
                <h2 className = "display-4"> 
                Welcome back, {currentUser.firstName} </h2> 
               : (
                <p>
                  <Link className="btn btn-primary font-weight-bold mr-3"
                        to="/login">
                    Log in
                  </Link>
                  <Link className="btn btn-primary font-weight-bold"
                        to="/signup">
                    Sign up
                  </Link>
                </p>
            )}
           </div>
        </div>
        </div>
    )
}

export default Home;
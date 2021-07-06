import react, {useEffect, useState, useContext} from 'react'
import {JoblyApi as API} from './backend/helpers/api'
import userContext from './Users/UserContext'
import jwt from 'jsonwebtoken'

const Home = () => {

    const currUserName = useContext(userContext)

    return (
        <div>
           {currUserName !== undefined ? `Welcome ${currUserName}` : "Hello"}
        </div>
    )
}

export default Home;
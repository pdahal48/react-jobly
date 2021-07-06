import React, {useState, useEffect, useContext} from 'react'
import {JoblyApi as API} from '../backend/helpers/api'
import CompanyCard from './CompanyCard'
import { Form, FormLabel } from 'react-bootstrap'
import userContext from '../Users/UserContext'
import {useHistory} from 'react-router-dom'


//Controls State for the company list. Each item in the list is sent to CompanyCard for render.
const CompanyList = () => {
    const [companies, setCompanies] = useState([])
    const [formData, setFormData] = useState({
        searchBox: ""
    });

    const currUserName = useContext(userContext)
    const History = useHistory()


    useEffect(() => {
        async function getCompanies() {
            if (currUserName === undefined) return History.go('/login')
            const Comp = await API.getCompanies()
            setCompanies(Comp)
        }
        getCompanies()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        let NewResult = await API.findCompanies({...formData})
        setCompanies(NewResult.companies)
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    return (
        <div>
        {(currUserName !== undefined) ?
        <div>
        <div className = "container">
        <Form inline className = "justify-content-center my-2 form-xl" onSubmit = {handleSubmit}>
            <FormLabel htmlFor = "searchBox"> </FormLabel>
            <input className = "form-control"
                id = "1"
                type="text"
                name = "searchBox"
                placeholder = "Enter search term..."
                value = {formData.searchBox}
                onChange = {handleChange}
            />
            <button className = "ml-1 btn btn-primary" variant="outline-success">Search</button>
        </Form>
        </div>
            {companies.map(comp => {
                return (
                    <CompanyCard company = {comp} key = {comp.name}/>
                )
            })}   
        </div>
        :  (
            <div>
                {
                History.push('/login')
                }
            </div>
        )
        }
    </div>

    )
}


export default CompanyList;
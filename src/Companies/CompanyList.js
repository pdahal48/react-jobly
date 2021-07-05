import React, {useState, useEffect} from 'react'
import {JoblyApi as API} from '../backend/helpers/api'
import CompanyCard from './CompanyCard'
import { Form, FormLabel } from 'react-bootstrap'

//Controls State for the company list. Each item in the list is sent to CompanyCard for render.
const CompanyList = () => {
    const [companies, setCompanies] = useState([])
    const [formData, setFormData] = useState({
        searchBox: ""
    });
    
    useEffect(() => {
        async function getCompanies() {
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
    )
}


export default CompanyList;
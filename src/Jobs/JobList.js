import React, {useState, useEffect} from 'react'
import {JoblyApi as API} from '../backend/helpers/api'
import JobCard from './JobCard'
import { Form, FormLabel } from 'react-bootstrap'

//Controls State for the company list. Each item in the list is sent to CompanyCard for render.
const JobList = () => {
    const [jobs, setJobs] = useState([])
    
    useEffect(() => {
        async function getJobs() {
            const allJobs = await API.getJobs()
            setJobs(allJobs)
        }
        getJobs()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        let NewResult = await API.findJobs({...formData})
        setJobs(NewResult.jobs)
    }

    const [formData, setFormData] = useState({
        searchBox: ""
    });

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
            {jobs.map(job => {
                return (
                    <JobCard job = {job} key = {job.id}/>
                )
            })}   
        </div>
    )
}


export default JobList;
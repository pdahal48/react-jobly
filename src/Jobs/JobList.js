import React, {useState, useEffect, useContext} from 'react'
import {JoblyApi as API} from '../backend/helpers/api'
import Search from "../SearchForm";
import JobCardList from './JobCardList'

//Controls State for the company list. Each item in the list is sent to CompanyCard for render.
const JobList = () => {
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        search();
    }, [])

    async function search(title) {
        let jobs = await API.getJobs(title);
        setJobs(jobs);
    }

    return (
        <div className="JobList col-md-8 offset-md-2">
          <Search searchFor={search} />
          {jobs.length
              ? <JobCardList jobs={jobs} />
              : <p className="lead">Sorry, no results were found!</p>
          }
        </div>
    );
}


export default JobList;
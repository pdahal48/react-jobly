import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Users/UserContext'

//Renders a simple job card with its tile, company name, salary, and Equity
const CompanyCard = ({ job }) => {

    const { hasAppliedToJob, applyToJob } = useContext(UserContext);
    const [applied, setApplied] = useState();

    useEffect(function updateAppliedStatus() {    
        setApplied(hasAppliedToJob(job.id));
    }, [job.id, hasAppliedToJob]);

      /** Apply for a job */
    async function handleApply(evt) {
        if (hasAppliedToJob(job.id)) return;
        applyToJob(job.id);
        setApplied(true);
    }

    return (
        <div className=" container JobCard card"> {applied}
        <div className="card-body">
          <h6 className="card-title">{job.title}</h6>
          <p>{job.companyName}</p>
          {job.salary && <div><small>Salary: {(job.salary)}</small></div>}
          {job.equity !== undefined && <div><small>Equity: {job.equity}</small></div>}
          <button
              className="btn btn-danger font-weight-bold text-uppercase float-right"
              onClick={handleApply}
              disabled={applied}
          >
            {applied ? "Applied" : "Apply"}
          </button>
        </div>
      </div>
    )
}

export default CompanyCard;
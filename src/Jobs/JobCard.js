import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Users/UserContext'

//Renders a simple job card with its tile, company name, salary, and Equity
const JobCard = ({ id, title, salary, equity, companyName }) => {

    const { hasAppliedToJob, applyToJob } = useContext(UserContext);
    const [applied, setApplied] = useState();

    useEffect(function updateAppliedStatus() {    
        setApplied(hasAppliedToJob(id));
    }, [id, hasAppliedToJob]);

      /** Apply for a job */
    async function handleApply(evt) {
        if (hasAppliedToJob(id)) return;
        applyToJob(id);
        setApplied(true);
    }

    return (
        <div className=" container JobCard card"> {applied}
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <p>{companyName}</p>
          {salary && <div><small>Salary: {(salary)}</small></div>}
          {equity !== undefined && <div><small>Equity: {equity}</small></div>}
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

export default JobCard;
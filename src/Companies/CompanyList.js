import React, { useState, useEffect } from 'react'
import {JoblyApi as API} from '../api'
import SearchForm from "../SearchForm";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../LoadingSpinner";

//Controls State for the company list. Each item in the list is sent to CompanyCard for render.
const CompanyList = () => {
    const [companies, setCompanies] = useState([])

    useEffect(() => {
        async function getCompanies(name) {
            const companies = await API.getCompanies(name)
            setCompanies(companies)
        }
        getCompanies()
    }, [])

    /** Triggered by search form submit; reloads companies. */
    async function search(name) {
        let companies = await API.getCompanies(name);
        setCompanies(companies);
    }
    if (!companies) return <LoadingSpinner />;

    return (
        <div className="CompanyList col-md-8 offset-md-2">
          <SearchForm searchFor ={search} />
          {companies.length
              ? (
                  <div className="CompanyList-list">
                    {companies.map(c => (
                        <CompanyCard
                            key={c.handle}
                            handle={c.handle}
                            name={c.name}
                            description={c.description}
                            logoUrl={c.logoUrl}
                        />
                    ))}
                  </div>
              ) : (
                  <p className="lead">Sorry, no results were found!</p>
              )}
        </div>
    );
}


export default CompanyList;
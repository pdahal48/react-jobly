import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {JoblyApi as API} from '../backend/helpers/api'

const CompanyDetail = () => {
    const { company } = useParams()
    const [companyInfo, setCompanyInfo] = useState([])

    useEffect(() => {
        async function getCompanyDetail() {
            const comp = await API.getCompany(company)
            setCompanyInfo(comp)
        }
        getCompanyDetail()
    }, [companyInfo])

    return (
        <div className = "container">
            <div className = "float-left">
            <h2 className = "display-4">{companyInfo.name}</h2>
            <span>
                {companyInfo.description}
            </span>
            </div>
        </div>
    )
}

export default CompanyDetail;

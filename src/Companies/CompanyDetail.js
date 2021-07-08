import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {JoblyApi as API} from '../api'
import LoadingSpinner from "../LoadingSpinner";

const CompanyDetail = () => {

    const { handle } = useParams()
    const [companyInfo, setCompanyInfo] = useState([])

    useEffect(() => {
        async function getCompanyDetail() {
            setCompanyInfo(await API.getCompany(handle))
        }
        getCompanyDetail()
    }, [handle])

    if (!companyInfo) return <LoadingSpinner />;

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

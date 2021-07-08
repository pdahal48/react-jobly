import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {JoblyApi as API} from '../backend/helpers/api'
import LoadingSpinner from "../LoadingSpinner";

const CompanyDetail = () => {

    const { handle } = useParams()
    const [companyInfo, setCompanyInfo] = useState([])

    useEffect(() => {
        async function getCompanyDetail() {
            const comp = await API.getCompany(handle)
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

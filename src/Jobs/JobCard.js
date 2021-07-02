import React from 'react'
import {Card, Button} from 'react-bootstrap'

//Renders a simple job card with its tile, company name, salary, and Equity
const CompanyCard = ({ job }) => {
    return (
        <div className = "container">
         <Card className = "mt-3">
            <Card.Header> <b> {job.title}</b> @ {job.companyName}</Card.Header>
            <Card.Body>
                    Salary: {job.salary}
                    <br></br>
                    Equity: {job.equity}
                    <br></br>
            <Button className = "btn-danger float-right"> Apply! </Button>
            </Card.Body>
            </Card>

        </div>
    )
}

export default CompanyCard;
import React from 'react'
import {Card} from 'react-bootstrap'

//Renders a simple company card with its name, description and an image
const CompanyCard = ({ company }) => {
    return (
        <div className = "container">
        <a href = {`/companies/${company.handle}`} className = "custom-card">
         <Card className = "mt-3">
            <Card.Header>{company.name}</Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    {company.description}
                    <Card.Img variant="buttom" className = "float-right" src={company.logoUrl} />
                </blockquote>            
            </Card.Body>
            </Card>
        </a>
        </div>
    )
}

export default CompanyCard;
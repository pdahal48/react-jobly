import React from 'react'
import {Card} from 'react-bootstrap'


//Renders a simple company card with its name, description and an image
const CompanyCard = ({ name, description, logoUrl, handle }) => {
    return (
        <a  className = "CompanyCard" href = {`/companies/${handle}`} className = "custom-card">
         <Card className = "mt-3">
            <Card.Header>{name}</Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    {description}
                    <Card.Img variant="buttom" className = "float-right" src={logoUrl} />
                </blockquote>            
            </Card.Body>
            </Card>
        </a>
    )
}

export default CompanyCard;
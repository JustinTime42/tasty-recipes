import React from "react";
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'

const RecipeCard = ({recipe}) => {
    return (        
        <Card style={{ margin: '1em', position: 'relative',width: '200px', height: '260px'}}>
            <img alt={recipe.description} className="mb-2" style={{ height:'130px', width:'200px', objectFit: 'cover' }} variant="top" src={`${process.env.REACT_APP_API}${recipe.images.medium}`} />
            <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>{recipe.description}</Card.Text>
                <Link to='/recipe' state={recipe} style={{position: 'absolute', right: '2px', bottom: '2px'}}>Full Recipe</Link>
            </Card.Body>
        </Card>
    )
}

export default RecipeCard
import React from "react"
import { useDispatch } from 'react-redux'
import { setActiveRecipe } from "./features/specials/activeRecipeSlice"
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'
import './RecipeCard.css'

const RecipeCard = ({recipe}) => {

    const dispatch = useDispatch() 

    const handleClick = () => {    
        dispatch(setActiveRecipe(recipe))
    }

    return (        
        <Card className='recipeCard'>
            <img alt={recipe.description} className="cardImg" variant="top" src={`${process.env.REACT_APP_API}${recipe.images.medium}`} />
            <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>{recipe.description}</Card.Text>
                <Link to={`/recipe/${recipe.uuid}`} onClick={handleClick} style={{position: 'absolute', right: '2px', bottom: '2px'}}>Full Recipe</Link>
            </Card.Body>
        </Card>
    )
}

export default RecipeCard
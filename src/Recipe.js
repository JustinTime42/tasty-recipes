import React from "react"
import { useSelector } from 'react-redux'
import Accordion from "react-bootstrap/Accordion"
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card'
import { useLocation } from "react-router-dom";
import './Recipe.css'

const Recipe = () => {
    const specials = useSelector(state => state.specials.specials)
    let data = useLocation();
    const recipe = data.state

    const findSpecials = (ingredient) => {
        console.log(specials)
        console.log(ingredient)
        const special = specials.find(special => special.ingredientId === ingredient.uuid)
        console.log(special)
        if (special) {
            
            return (
                <Card>{special.type.toUpperCase()}: {special.title}<br />{special.text}</Card>
            )
        } else return null
    }

    const dateOptions = {

    }

    return (
        <div className='recipeDetails'>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <img srcSet={`${process.env.REACT_APP_API}${recipe.images.medium} 570w,
                        ${process.env.REACT_APP_API}${recipe.images.full} 1200w`}
                sizes="(max-width: 600px) 100vw,
                        80vw"
                src={`${process.env.REACT_APP_API}${recipe.images.small}`}
                alt={recipe.description}
                width='100%'>            
            </img> 
            <Card>
                <Card.Body>
                    <p>Prep Time: {recipe.prepTime} minutes</p>
                    <p>Cook Time: {recipe.cookTime} minutes</p>
                    <p>Total Time: {recipe.prepTime + recipe.cookTime} minutes</p>
                    <p>Servings: {recipe.servings}</p>
                </Card.Body>
            </Card>
            <Accordion defaultActiveKey="0">
                <Accordion.Item key={0} eventKey="0">
                    <Accordion.Header>Ingredients</Accordion.Header>
                    <Accordion.Body>
                        {
                            recipe.ingredients.map((item, i) => {
                                return (
                                    <p key={i}>
                                        {`${item.amount} ${item.measurement} ${item.name}`}
                                        {findSpecials(item)}
                                    </p>                                        
                                )
                            })
                        }
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item key={1} eventKey="1">
                <Accordion.Header>Directions</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup as='ol' numbered variant="flush">
                        {
                            recipe.directions.map((item, i) => {
                                return (
                                        <ListGroup.Item as='li' key={i}>{item.instructions} {item.optional ? '(optional)' : null}</ListGroup.Item>
                                )
                            })
                        }
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <p>Posted on {recipe.postDate}</p>
                <p>Last Updated {recipe.editDate}</p>
            </div>
        </div>
    )
}

export default Recipe
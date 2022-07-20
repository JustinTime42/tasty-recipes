import React from "react";
import RecipeCard from './RecipeCard'

const CardList = (props) => {

    const listStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
    return (
        <div style={listStyle}>
            {
            props.recipes.map((recipe, i) => {
                return <RecipeCard key={i} recipe={recipe} />                
            })
            }
        </div>

    )
}

export default CardList
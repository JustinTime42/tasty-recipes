import React from "react"
import { useSelector } from 'react-redux'

import RecipeCard from './RecipeCard'
import './styles/CardList.css'

const CardList = () => {
    const recipes = useSelector(state => state.recipes.recipes)

    return (
        <div className='cardList'>
            {
            recipes.map((recipe, i) => {
                return <RecipeCard key={i} recipe={recipe} />                
            })
            }
        </div>
    )
}

export default CardList
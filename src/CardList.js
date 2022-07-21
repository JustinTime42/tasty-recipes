import React, {useEffect} from "react";
import {useSelector} from 'react-redux'

import RecipeCard from './RecipeCard'
import './CardList.css'

const CardList = (props) => {
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
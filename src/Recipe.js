import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import { setActiveRecipe } from "./features/specials/activeRecipeSlice"
import Accordion from "react-bootstrap/Accordion"
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './styles/Recipe.css'
import { setEditing } from "./features/specials/setEditingSlice"

const Recipe = () => {
    const specials = useSelector(state => state.specials.specials)
    const recipe = useSelector(state => state.activeRecipe.recipe)
    const editing = useSelector(state => state.setEditing.editing)
    const dispatch = useDispatch()
    const recipeParams = useParams()

    useEffect(() => {
        if(!recipe.uuid && recipeParams.name) {
            console.log(recipeParams)
            fetch(`${process.env.REACT_APP_API}/recipes/${recipeParams.name}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch(setActiveRecipe(data))
            } )
            .catch(err => alert(err))
        }
    },[recipe])

    const inputStyle = (text) => {
        let field = text
        let width = 0

        if (text === '') {
            console.log("nothing", text)
            width = 0
        } else if (typeof(text) === 'number') {   
            field = text.toString()
            width = ((field.length + 3) * 8) 
        } else {
            width = ((field.length + 1) * 8)
        }
        width = ((width < 40) && (editing)) ? 40 : width
        return (
            {
                width: `${width}px`,
                display: 'inline',
                border: editing ? '1px solid black' : 'none',
                backgroundColor: 'white',
            }
        )
    }

    const findSpecials = (ingredient) => {
        const special = specials.find(special => special.ingredientId === ingredient.uuid)
        if (special) {
            return (
                <Card>{special.type.toUpperCase()}: {special.title}<br />{special.text}</Card>
            )
        } else return null
    }

    const onChange = (event, field=null, item={}) => {   
        let { target: { name, value } } = event 
        let numberValues = ['servings', 'prepTime', 'cookTime', 'amount']
        if (numberValues.includes(name)){
            value = !value ? '' : Number(value)
        } 
        if (field) {
            let newField = recipe[field].map(item => {return {...item}})
            let itemIndex = recipe[field].findIndex(i => i === item)
            if (name === 'optional') {
                newField[itemIndex][name] = !newField[itemIndex][name]
            } else {
                newField[itemIndex][name] = value
            }
            let newRecipe = {...recipe, [field]: newField}
            dispatch(setActiveRecipe(newRecipe))
        } else {
            dispatch(setActiveRecipe({...recipe, [name]:value}))
        }         
    }

    const handleSave = (recipe) => {
        fetch(`${process.env.REACT_APP_API}/recipes/${recipe.uuid}`, {
            method: 'PATCH',
            body: JSON.stringify({...recipe}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        })
        .then(res => res.json())
        .then(data => {
            dispatch(setActiveRecipe(data))
            dispatch(setEditing(false))
        })
        .catch(err => alert(err))
    }

    return (
        <div className='recipeDetails'>
            <Button hidden={!editing}  className='saveButton' onClick={() => handleSave(recipe)}>Save</Button>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <div className='topSection'>
                <img srcSet={`${process.env.REACT_APP_API}${recipe.images.medium} 570w,
                            ${process.env.REACT_APP_API}${recipe.images.full} 1200w`}
                    sizes="(max-width: 600px) 100vw,
                            80vw"
                    src={`${process.env.REACT_APP_API}${recipe.images.small}`}
                    alt={recipe.description}
                    width='100%'>            
                </img> 
                <Card className='timeCard'>
                    <Card.Body>
                        <div>
                            <label >Prep Time:</label>
                            <input disabled={!editing} style={inputStyle(recipe.prepTime)} type='number' name='prepTime' value={recipe.prepTime} onChange={onChange} />
                            <label> minutes </label>
                        </div>
                        <div>
                            <label >Cook Time:</label>
                            <input disabled={!editing} style={inputStyle(recipe.cookTime)} type='number' name='cookTime' value={recipe.cookTime} onChange={onChange} />
                            <label> minutes </label>
                        </div>
                        <p>Total Time: {recipe.prepTime + recipe.cookTime} minutes</p>
                        <div className='recipeItem'>
                            <label>Servings:</label>
                            <input disabled={!editing} style={inputStyle('servings')} type='number' name='servings' value={recipe.servings} onChange={onChange} />
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <Accordion defaultActiveKey="0" alwaysOpen>
                <Accordion.Item key={0} eventKey="0">
                    <Accordion.Header>Ingredients</Accordion.Header>
                    <Accordion.Body>
                        {
                            recipe.ingredients.map((item, i) => {
                                return (
                                    <div style={{marginBottom:'1em'}} key={i}>
                                        <div className='recipeItem'>
                                            <input disabled={!editing} style={inputStyle(item.amount)} type='number' name='amount' value={item.amount} onChange={(e) => onChange(e, 'ingredients', item)} />
                                            <input disabled={!editing} style={inputStyle(item.measurement)} type='text' name='measurement' value={item.measurement} onChange={(e) => onChange(e, 'ingredients', item)} />
                                            <input disabled={!editing} style={inputStyle(item.name)} type='text' name='name' value={item.name} onChange={(e) => onChange(e, 'ingredients', item)} />
                                        </div>
                                        {findSpecials(item)}
                                    </div>                                        
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
                                    <ListGroup.Item as='li'  key={i}>
                                        <input disabled={!editing} style={inputStyle(item.instructions)} type='text' name='instructions' value={item.instructions} onChange={(e) => onChange(e, 'directions', item)} />
                                        <input disabled={true} style={inputStyle(item.optional)} type={(item.optional || editing)? "text" : 'hidden'} name='optional' value={item.optional ? '(optional)' : ''} onChange={(e) => onChange(e, 'directions', item)} />
                                        <input type={editing ? "checkbox" : 'hidden'} id={item.instructions} name='optional' checked={item.optional} onChange={(e) => onChange(e, 'directions', item)}></input>
                                        <label style={{visibility: editing ? 'visible' : 'hidden'}}  for={item.instructions}>Optional?</label>
                                    </ListGroup.Item>
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
import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from "react-router-dom"
import CardList from './CardList'
import Recipe from './Recipe'
import './App.css';
import { setSpecials } from './features/specials/specialsSlice'

const App = () => {
  const [recipes, setRecipes] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    getData('/recipes')
    .then(data => setRecipes(data))
    getData('/specials')
    .then(data => {dispatch(setSpecials(data))} )
  },[])

  const getData = (endpoint) => {
    return (
      fetch(`${process.env.REACT_APP_API}${endpoint}`)
      .then(res => res.json())
      .then(data => {return data})
      .catch(err => alert(err))
    )
  }

    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<CardList recipes={recipes}/>} />
          <Route path="/recipe" element={<Recipe />} />
        </Routes>
      </div>
  )
}

export default App

import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CardList from './CardList'
import Recipe from './Recipe'
import {slide as Menu} from 'react-burger-menu'
import './App.css'
import './menu.css'
import { setSpecials } from './features/specials/specialsSlice'
import { setRecipes } from './features/specials/recipesSlice'
import { clearActiveRecipe } from "./features/specials/activeRecipeSlice"
import { setEditing } from './features/specials/setEditingSlice'

import ScrollTop from './ScrollTop'

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState({menuOpen: false})
  const dispatch = useDispatch()

  useEffect(() => {
    getData('/recipes')
    .then(data => {dispatch(setRecipes(data))})
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

  const handleMenuChange = (state) => {
    setIsMenuOpen({menuOpen: state.isOpen})
  }

  const handleClose = () => {
    setIsMenuOpen({menuOpen: false})
  }

  const handleEdit = () => {
    setIsMenuOpen({menuOpen: false})
    dispatch(setEditing(true))
  }

  const handleNew = () => {
    setIsMenuOpen({menuOpen: false})    
    dispatch(clearActiveRecipe())
    dispatch(setEditing(true))
  }

    return (
      <div className="App">
        <Menu 
          isOpen={isMenuOpen.menuOpen}
          onStateChange={(state) => setIsMenuOpen(state)}
        >
          <a id="home" className="menu-item" href="/" onClick={() => setIsMenuOpen({menuOpen: false})}>Home</a>
          <a id="new" className="menu-item" href="/recipe/" onClick={() => handleNew()}>Add Recipe</a>
          <a id="edit" className="menu-item" onClick={() => handleEdit()}>Edit Recipe</a>
        </Menu>
        <Router>
          <ScrollTop>
            <Routes>
              <Route path="/" element={<CardList/>} />
              <Route path="/recipe/" element={<Recipe />} />
              <Route path="/recipe/:name" element={<Recipe />} />
            </Routes>
          </ScrollTop>
        </Router>
      </div>
  )
}

export default App

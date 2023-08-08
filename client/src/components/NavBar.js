import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar(){
  return (<div>
    NavBar component
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/meals'>Meals</NavLink>
    <NavLink to='/ingredients'>Ingredients</NavLink>
    <NavLink to='/logout'>Logout</NavLink>
    </div>
    )
}

export default NavBar


import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const navStyles = {
  width: '100%',
  backgroundColor: 'lightblue',
  padding: '10px'
}

const navLinkStyles ={
  marginLeft: '10px'
}

const navLinkSelected = {
  color: 'red'
}

function NavBar(){
  return (<>
       <Menu>
         <Menu.Item as={NavLink} to="/" exact name="Home"></Menu.Item>
         <Menu.Item as={NavLink} to="/meals" name="Meals"></Menu.Item>
         <Menu.Item as={NavLink} to="/ingredients" name="Ingredients"></Menu.Item>
         <Menu.Item as={NavLink} to="/logout" name="Logout"></Menu.Item>
       </Menu>
     </>
    )
}

export default NavBar


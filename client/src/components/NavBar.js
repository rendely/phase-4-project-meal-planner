import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu , Button} from 'semantic-ui-react'


function NavBar({onLogout}){

  return (<>
       <Menu>
         <Menu.Item as={NavLink} to="/" exact name="Home"></Menu.Item>
         <Menu.Item as={NavLink} to="/meals" name="Meals"></Menu.Item>
         <Menu.Item as={NavLink} to="/ingredients" name="Ingredients"></Menu.Item>
         <Menu.Item as={Link} to="/" name="Logout" onClick={onLogout}></Menu.Item>
       </Menu>
     </>
    )
}

export default NavBar


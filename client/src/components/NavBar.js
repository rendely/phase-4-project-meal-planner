import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu , Container} from 'semantic-ui-react'


function NavBar({onLogout}){

  return (<>
       <div style={{marginBottom: '70px'}}>
       <Menu fixed='top'>
         <Menu.Item as={NavLink} to="/" exact name="Home"></Menu.Item>
         <Menu.Item as={NavLink} to="/meals" name="Meals"></Menu.Item>
         <Menu.Item as={NavLink} to="/ingredients" name="Ingredients"></Menu.Item>
         <Menu.Item as={Link} to="/" name="Logout" onClick={onLogout}></Menu.Item>
       </Menu>
       </div>
     </>
    )
}

export default NavBar


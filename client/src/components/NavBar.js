import { Menu, Icon } from 'semantic-ui-react'
import { NavLink, Link } from 'react-router-dom'

function NavBar({ onLogout }) {

  return (<>
    <div style={{ marginBottom: '70px' }}>
      <Menu widths={8} fixed='top'>
        <Menu.Item as='span' style={{fontWeight: '800'}} >
          <Icon name='clipboard outline' />
          Meal Planner
          </Menu.Item>
        <Menu.Item as={NavLink} to="/" exact name="Home"></Menu.Item>
        <Menu.Item as={NavLink} to="/meals" name="Meals"></Menu.Item>
        <Menu.Item as={NavLink} to="/ingredients" name="Ingredients"></Menu.Item>
        <Menu.Item as={Link} to="/" name="Logout" onClick={onLogout}></Menu.Item>
      </Menu>
    </div>
  </>
  )
}

export default NavBar;
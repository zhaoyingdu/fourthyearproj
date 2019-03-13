import React, {useState, useEffect} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';
import {Auth} from './loginRegister/LoginRegister'
import {Link}from 'react-router-dom'

export default ()=> {
  let [open, setOpen] = useState(false)

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to='/'>Park</NavbarBrand>
        <NavbarToggler onClick={()=>setOpen(!open)} />
        <Collapse isOpen={open} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to='/map'>Map</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='/ticket'>Ticket</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='/station'>Stations</NavLink>
            </NavItem>
            <Auth />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}



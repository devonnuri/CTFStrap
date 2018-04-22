import React, { Component } from 'react';
import { Navbar, NavbarBrand, Collapse, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink as NavigationLink } from 'react-router-dom';

import Challenge from '../routes/Challenge';
import Rank from '../routes/Rank';

import config from '../ctfstrap.config.js';

class Header extends Component {
  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">{config.ctfName}</NavbarBrand>
        <Collapse navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavigationLink to={Challenge} className="nav-link" activeClassName="active">Challenge</NavigationLink>
            </NavItem>
            <NavItem>
              <NavigationLink to={Rank} className="nav-link" activeClassName="active">Rank</NavigationLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>Account</DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Login</DropdownItem>
                <DropdownItem>Sign up</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Header;

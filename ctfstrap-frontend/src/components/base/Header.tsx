import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Container from './Container';

const HeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Navbar = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
  flex-grow: 1;
`;

const Title = styled.h1`
  display: inline-block;
  vertical-align: middle;
  margin: 1rem 3rem 1rem 0;
`;

const NavbarLeft = styled.div`
  display: flex;
  margin-right: auto;
`;

const NavbarRight = styled.div`
  display: flex;
  margin-left: auto;
`;

const NavbarItem = styled.div`
  display: block;
  padding: 0 1rem;
  font-size: 1.2em;
`;

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <HeaderContainer>
      <Title>
        <Link to="/">CTFStrap</Link>
      </Title>
      <Navbar>
        <NavbarLeft>
          <NavbarItem>
            <Link to="/challenges">Challenges</Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/scoreboard">Scoreboard</Link>
          </NavbarItem>
        </NavbarLeft>
        <NavbarRight>
          <NavbarItem>
            <Link to="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/register">Register</Link>
          </NavbarItem>
          <NavbarItem>Logout</NavbarItem>
        </NavbarRight>
      </Navbar>
    </HeaderContainer>
  );
};

export default Header;

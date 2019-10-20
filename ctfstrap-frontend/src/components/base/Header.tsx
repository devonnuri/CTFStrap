import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from './Container';
import { RootState } from '../../modules';

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

const mapStateToProps = (state: RootState) => ({
  user: state.user.user,
});
const mapDispatchToProps = {};

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
type HeaderProps = OwnProps & StateProps & DispatchProps;

const Header: React.FC<HeaderProps> = ({ user }) => (
  <HeaderContainer>
    <Title>
      <Link to="/">CTFStrap</Link>
    </Title>
    <Navbar>
      <NavbarLeft>
        {user && (
        <NavbarItem>
          <Link to="/challenges">Challenges</Link>
        </NavbarItem>
        )}
        <NavbarItem>
          <Link to="/scoreboard">Scoreboard</Link>
        </NavbarItem>
        {user && user.admin && (
        <NavbarItem>
          <Link to="/admin">Admin</Link>
        </NavbarItem>
        )}
      </NavbarLeft>
      <NavbarRight>
        {user ? (
          <NavbarItem>
            <Link to="/logout">Logout</Link>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem>
              <Link to="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/register">Register</Link>
            </NavbarItem>
          </>
        )}
      </NavbarRight>
    </Navbar>
  </HeaderContainer>
);

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

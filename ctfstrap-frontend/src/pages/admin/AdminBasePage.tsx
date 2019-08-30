import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Container from '../../components/base/Container';

const Sidebar = styled.div`
  width: 10rem;
  position: fixed;
  height: 100%;
  overflow: auto;

  a {
    display: block;
    color: inherit;
    padding: 1rem;
    text-decoration: none;

    &.active {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      background-color: ${palette.primary50};
      color: ${palette.primary700};
      font-weight: bold;
      border-bottom: 3px solid ${palette.primary700};
    }
  }
`;

const Content = styled.div`
  margin-left: 10rem;
  padding-left: 3rem;
`;

interface AdminBasePageProps {}

const AdminBasePage: React.FC<AdminBasePageProps> = ({ children }) => {
  return (
    <Container>
      <Sidebar>
        <NavLink exact to="/admin" activeClassName="active">
          Home
        </NavLink>
        <NavLink exact to="/admin/chall" activeClassName="active">
          Challenge
        </NavLink>
        <NavLink exact to="/admin/user" activeClassName="active">
          User
        </NavLink>
        <NavLink exact to="/admin/team" activeClassName="active">
          Team
        </NavLink>
      </Sidebar>
      <Content>{children}</Content>
    </Container>
  );
};

export default AdminBasePage;

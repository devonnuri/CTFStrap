import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Container from '../../components/base/Container';

const AdminContainer = styled(Container)`
  display: flex;
`;

const Sidebar = styled.div`
  flex: 0 0 10rem;
  width: 10rem;

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
  flex: 1;
  padding: 0 3rem;
`;

interface AdminBasePageProps {}

const AdminBasePage: React.FC<AdminBasePageProps> = ({ children }) => {
  return (
    <AdminContainer>
      <Sidebar>
        <NavLink exact to="/admin" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/admin/chall" activeClassName="active">
          Challenge
        </NavLink>
        <NavLink to="/admin/user" activeClassName="active">
          User
        </NavLink>
      </Sidebar>
      <Content>{children}</Content>
    </AdminContainer>
  );
};

export default AdminBasePage;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AdminBasePage from './AdminBasePage';
import { getUserList, User } from '../../lib/api/user';
import Table from '../../components/base/Table';
import Badge from '../../components/base/Badge';

interface AdminUserPageProps {}

const UserTable = styled(Table)`
  tbody td {
    &:nth-child(1) {
      width: 5%;
      text-align: center;
    }
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5) {
      width: 10%;
    }
    &:nth-child(6) {
      width: 20%;
      text-align: center;
    }
  }
`;

const AdminUserPage: React.FC<AdminUserPageProps> = () => {
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    getUserList().then(({ data }) => {
      setUserList(data);
    });
  }, []);

  return (
    <AdminBasePage>
      <h1>Manage Users</h1>
      <UserTable>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Admin</th>
            <th>Points</th>
            <th>Last Solved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.admin ? 'True' : 'False'}</td>
              <td>{user.points}</td>
              <td>{user.lastSolve || '-'}</td>
              <td>
                <Badge>Edit</Badge>
                <Badge>Remove</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </UserTable>
    </AdminBasePage>
  );
};

export default AdminUserPage;

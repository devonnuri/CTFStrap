import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getChallList } from '../../lib/api/chall';
import { ChallengeModal } from '../../modules/chall';
import Table from '../../components/base/Table';
import Badge from '../../components/base/Badge';
import AdminBasePage from './AdminBasePage';
import palette from '../../lib/styles/palette';

const ChallTable = styled(Table)`
  tbody td {
    &:nth-child(1) {
      width: 5%;
      text-align: center;
    }
    &:nth-child(3),
    &:nth-child(4) {
      width: 10%;
    }
    &:nth-child(5) {
      width: 20%;
      text-align: center;
    }
  }
`;

interface AdminChallPageProps {}

const AdminChallPage: React.FC<AdminChallPageProps> = () => {
  const [challList, setChallList] = useState<ChallengeModal[]>([]);

  useEffect(() => {
    getChallList().then(({ data }) => {
      setChallList(data);
    });
  }, []);

  return (
    <AdminBasePage>
      <h1>Manage Challenges</h1>
      <ChallTable>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {challList.map(chall => (
            <tr key={chall.id}>
              <td>{chall.id}</td>
              <td>{chall.name}</td>
              <td>{chall.category}</td>
              <td>{chall.points}pts</td>
              <td>
                <Badge>Edit</Badge>
                <Badge>Remove</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </ChallTable>
    </AdminBasePage>
  );
};

export default AdminChallPage;

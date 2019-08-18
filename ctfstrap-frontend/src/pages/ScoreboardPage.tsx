import React, { useState } from 'react';
import styled from 'styled-components';
import Container from '../components/base/Container';
import PageTitle from '../components/base/PageTitle';
import { getRank } from '../lib/api/user';

const ScoreTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead th {
    border-bottom: 2px solid gray;

    padding: 1rem;
  }

  tbody td {
    border-bottom: 1px solid gray;
    padding: 1rem;

    &:nth-child(1) {
      width: 5%;
      text-align: center;
    }
    &:nth-child(3) {
      width: 20%;
    }
    &:nth-child(4) {
      width: 20%;
      white-space: nowrap;
    }
  }
`;

interface ScoreboardPageProps {}

const ScoreboardPage: React.FC<ScoreboardPageProps> = () => {
  // TODO: make type of rank
  const [rank, setRank] = useState<any[]>([]);
  getRank().then(({ data }) => {
    setRank(data);
  });
  return (
    <Container>
      <PageTitle>Scoreboard</PageTitle>
      <ScoreTable>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Score</th>
            <th>Last Solved</th>
          </tr>
        </thead>
        <tbody>
          {rank.map((user, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{user.username}</td>
              <td>{user.points}</td>
              <td>{user.lastSolve || '-'}</td>
            </tr>
          ))}
        </tbody>
      </ScoreTable>
    </Container>
  );
};

export default ScoreboardPage;

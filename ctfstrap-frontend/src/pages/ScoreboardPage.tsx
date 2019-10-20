import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from '../components/base/Container';
import PageTitle from '../components/base/PageTitle';
import Table from '../components/common/Table';
import { getRank, RankUser } from '../lib/api/user';

const ScoreTable = styled(Table)`
  tbody td {
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
  const [rank, setRank] = useState<RankUser[]>([]);

  useEffect(() => {
    getRank().then(({ data }) => {
      setRank(data);
    });
  }, []);

  return (
    <Container>
      <PageTitle>Scoreboard</PageTitle>
      <ScoreTable>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Points</th>
            <th>Last Solved</th>
          </tr>
        </thead>
        <tbody>
          {rank.map((user, i) => (
            <tr key={user.username}>
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

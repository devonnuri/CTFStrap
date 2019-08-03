import React from 'react';
import styled from 'styled-components';
import Container from '../components/base/Container';
import PageTitle from '../components/base/PageTitle';

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
  return (
    <Container>
      <PageTitle>Scoreboard</PageTitle>
      <ScoreTable>
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>Score</th>
            <th>Last Solved</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>DEVONNURI</td>
            <td>12340</td>
            <td>10 minutes ago</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>2</td>
            <td>DEVON</td>
            <td>12000</td>
            <td>5 minutes ago</td>
          </tr>
        </tbody>
      </ScoreTable>
    </Container>
  );
};

export default ScoreboardPage;

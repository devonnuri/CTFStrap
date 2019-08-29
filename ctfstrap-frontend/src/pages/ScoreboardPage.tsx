import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Container from '../components/base/Container';
import PageTitle from '../components/base/PageTitle';
import { RootState } from '../modules';

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

const mapStateToProps = (state: RootState) => ({
  rank: state.user.rank,
});
const mapDispatchToProps = {};

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
type ScoreboardPageProps = OwnProps & StateProps & DispatchProps;

const ScoreboardPage: React.FC<ScoreboardPageProps> = ({ rank }) => {
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

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(ScoreboardPage);

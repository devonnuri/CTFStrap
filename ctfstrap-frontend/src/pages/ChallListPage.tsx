import React from 'react';
import styled from 'styled-components';
import Container from '../components/base/Container';
import Challenge from '../components/chall/Challenge';
import PageTitle from '../components/base/PageTitle';
import ChallModal from '../components/chall/ChallModal';
import { RootState } from '../modules';
import { connect } from 'react-redux';

const ChallListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  align-items: stretch;
`;

const mapStateToProps = (state: RootState) => ({
  challList: state.chall.challList,
});
const mapDispatchToProps = {};

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
type ChallListPageProps = OwnProps & StateProps & DispatchProps;

const ChallListPage: React.FC<ChallListPageProps> = ({ challList }) => {
  return (
    <Container>
      <PageTitle>Challenges</PageTitle>
      <ChallListContainer>
        {challList.map(
          ({ id, name, points, description, category, author }) => (
            <Challenge
              key={id}
              id={id}
              name={name}
              points={points}
              description={description}
              category={category}
              author={author}
              tags={[]}
              solved={false}
            />
          ),
        )}
      </ChallListContainer>
      <ChallModal />
    </Container>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(ChallListPage);

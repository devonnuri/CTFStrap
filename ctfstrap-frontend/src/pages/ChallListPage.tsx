import * as React from 'react';
import styled from 'styled-components';
import Container from '../components/base/Container';
import Challenge from '../components/chall/Challenge';
import PageTitle from '../components/base/PageTitle';
import ChallModal from '../components/chall/ChallModal';

const ChallListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  align-items: stretch;
`;

interface ChallListPageProps {}

const ChallListPage: React.FC<ChallListPageProps> = () => {
  return (
    <Container>
      <PageTitle>Challenges</PageTitle>
      <ChallListContainer>
        <Challenge
          title="Easy Web"
          points={100}
          description="Easy Web Challenge! Try it!"
          category="Web"
          author="devonnuri"
          tags={['Very Easy', 'View Source']}
          solved={true}
        />
      </ChallListContainer>
      <ChallModal />
    </Container>
  );
};

export default ChallListPage;

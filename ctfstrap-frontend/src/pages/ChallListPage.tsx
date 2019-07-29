import * as React from 'react';
import styled from 'styled-components';
import Container from '../components/base/Container';
import Challenge from '../components/chall/Challenge';
import PageTitle from '../components/base/PageTitle';

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
        <Challenge title="Easy Web" points={100} solved={true} />
        <Challenge title="Easy SQLi" points={200} solved={false} />
        <Challenge title="Easy XSS" points={300} solved={false} />
        <Challenge title="Easy NodeJS" points={400} solved={false} />
        <Challenge title="Hard Web" points={500} solved={false} />
        <Challenge title="Hard SQLi" points={600} solved={false} />
        <Challenge title="Hard XSS" points={700} solved={false} />
        <Challenge title="Hard NodeJS" points={800} solved={false} />
        <Challenge title="Hell Web" points={900} solved={false} />
        <Challenge title="Hell SQLi" points={1000} solved={false} />
        <Challenge title="Hell XSS" points={1100} solved={false} />
        <Challenge title="Hell NodeJS" points={1200} solved={false} />
      </ChallListContainer>
    </Container>
  );
};

export default ChallListPage;

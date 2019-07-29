import React from 'react';
import styled from 'styled-components';
import Container from '../components/Container';
import Challenge from '../components/chall/Challenge';
import PageTitle from '../components/PageTitle';

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
        <Challenge title="Easy Web" points={100} />
        <Challenge title="Easy SQLi" points={200} />
        <Challenge title="Easy XSS" points={300} />
        <Challenge title="Easy NodeJS" points={400} />
        <Challenge title="Hard Web" points={500} />
        <Challenge title="Hard SQLi" points={600} />
        <Challenge title="Hard XSS" points={700} />
        <Challenge title="Hard NodeJS" points={800} />
        <Challenge title="Hell Web" points={900} />
        <Challenge title="Hell SQLi" points={1000} />
        <Challenge title="Hell XSS" points={1100} />
        <Challenge title="Hell NodeJS" points={1200} />
      </ChallListContainer>
    </Container>
  );
};

export default ChallListPage;

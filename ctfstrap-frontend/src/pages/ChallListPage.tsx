import React from 'react';
import styled from 'styled-components';
import Container from '../components/Container';
import Header from '../components/Header';

const ChallContainer = styled.div`
  display: inline-block;
  border: 1px solid black;
  padding: 1rem;
`;

const ChallTitle = styled.h2`
  margin: 0;
`;

interface MainPageProps {}

const ChallListPage: React.FC<MainPageProps> = () => {
  return (
    <Container>
      <ChallContainer>
        <ChallTitle>Easy Web</ChallTitle>
      </ChallContainer>
    </Container>
  );
};

export default ChallListPage;

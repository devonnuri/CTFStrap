import React from 'react';
import styled from 'styled-components';
import Container from '../components/base/Container';
import Challenge from '../components/chall/Challenge';
import PageTitle from '../components/base/PageTitle';
import ChallModal from '../components/chall/ChallModal';
import { listChall, ChallItem } from '../lib/api/chall';

const { useState } = React;

const ChallListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  align-items: stretch;
`;

interface ChallListPageProps {}

const ChallListPage: React.FC<ChallListPageProps> = () => {
  const [challList, setChallList] = useState<ChallItem[]>([]);

  listChall().then(response => {
    setChallList(response.data);
  });

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

export default ChallListPage;

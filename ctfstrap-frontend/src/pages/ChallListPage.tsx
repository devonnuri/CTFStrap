import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from '../components/base/Container';
import Challenge from '../components/chall/Challenge';
import PageTitle from '../components/base/PageTitle';
import ChallModal from '../components/chall/ChallModal';
import { ChallengeModal } from '../modules/chall';
import { getChallList } from '../lib/api/chall';
import { getSolves } from '../lib/api/user';

const ChallListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  align-items: stretch;
`;

const Placeholder = styled.div`
  flex: 1 1 20%;
  min-width: 12rem;
  margin: 1rem;
`;

interface ChallListPageProps {}

const ChallListPage: React.FC<ChallListPageProps> = () => {
  const [challList, setChallList] = useState<ChallengeModal[]>([]);

  useEffect(() => {
    Promise.all([getChallList(), getSolves()]).then(
      ([{ data: challData }, { data: solveData }]) => {
        setChallList(
          challData.map(chall => ({
            ...chall,
            solved: solveData.includes(chall.id),
          })),
        );
      },
    );
  }, []);

  return (
    <Container>
      <PageTitle>Challenges</PageTitle>
      <ChallListContainer>
        {challList.map(
          ({
            id,
            name,
            points,
            description,
            category,
            author,
            files,
            tags,
            solved,
          }) => (
            <Challenge
              key={id}
              id={id}
              name={name}
              points={points}
              description={description}
              category={category}
              author={author}
              files={files}
              tags={tags}
              solved={solved}
            />
          ),
        )}
        {[...Array(4).keys()].map(i => (
          <Placeholder key={i} />
        ))}
      </ChallListContainer>
      <ChallModal />
    </Container>
  );
};

export default ChallListPage;

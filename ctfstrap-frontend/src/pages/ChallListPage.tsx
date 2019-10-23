import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from '../components/base/Container';
import Challenge from '../components/chall/Challenge';
import PageTitle from '../components/base/PageTitle';
import ChallModal from '../components/chall/ChallModal';
import { ChallengeModal, viewAllChall } from '../lib/api/chall';
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

interface GroupedChallList {
  [category: string]: ChallengeModal[];
}

const ChallListPage: React.FC<ChallListPageProps> = () => {
  const [challList, setChallList] = useState<ChallengeModal[]>([]);

  useEffect(() => {
    Promise.all([viewAllChall(), getSolves()]).then(
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

  const challGroup = challList.reduce((group: GroupedChallList, chall) => {
    // eslint-disable-next-line no-param-reassign
    (group[chall.category] = group[chall.category] || []).push(chall);
    return group;
  }, {});

  return (
    <Container>
      <PageTitle>Challenges</PageTitle>
      {Object.entries(challGroup).map(([category, challenges]) => (
        <React.Fragment key={category}>
          <h1>{category}</h1>
          <ChallListContainer>
            {(challenges as ChallengeModal[]).map(
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
        </React.Fragment>
      ))}

      <ChallModal />
    </Container>
  );
};

export default ChallListPage;

import React from 'react';
import styled from 'styled-components';

const ChallContainer = styled.div`
  display: inline-block;
  border: 1px solid black;

  flex-basis: 20%;
  flex-grow: 1;
  flex-shrink: 1;

  min-width: 12rem;
  margin: 1rem;

  text-align: center;
`;

const ChallTitle = styled.h3``;

const ChallPoints = styled.p``;

interface ChallengeProps {
  title: string;
  points: number;
}

const Challenge: React.FC<ChallengeProps> = ({ title, points }) => {
  return (
    <ChallContainer>
      <ChallTitle>{title}</ChallTitle>
      <ChallPoints>{points}pts</ChallPoints>
    </ChallContainer>
  );
};

export default Challenge;

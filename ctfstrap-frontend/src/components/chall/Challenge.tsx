import * as React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { RootState } from '../../modules';
import { showChallModal, ChallModal } from '../../modules/chall';
import { connect } from 'react-redux';

interface ChallContainerProps {
  solved: boolean;
}

const ChallContainer = styled.div<ChallContainerProps>`
  display: inline-block;
  flex-basis: 20%;
  flex-grow: 1;
  flex-shrink: 1;

  min-width: 12rem;
  margin: 1rem;

  background-color: ${palette.gray50};
  border-radius: 7px;
  cursor: pointer;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  text-align: center;

  ${props =>
    props.solved &&
    css`
      background-color: ${palette.primary600};
      color: white;
    `}
`;

const mapDispatchToProps = {
  showChallModal,
};

type OwnProps = ChallModal;
interface StateProps {}
type DispatchProps = typeof mapDispatchToProps;
type ChallengeProps = OwnProps & StateProps & DispatchProps;

const Challenge: React.FC<ChallengeProps> = ({
  title,
  points,
  description,
  category,
  author,
  tags,
  solved,
  showChallModal,
}) => {
  return (
    <ChallContainer
      solved={solved}
      onClick={() =>
        showChallModal({
          title,
          points,
          description,
          category,
          author,
          tags,
          solved,
        })
      }
    >
      <h3>{title}</h3>
      <p>{points}pts</p>
    </ChallContainer>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  () => ({}),
  mapDispatchToProps,
)(Challenge);

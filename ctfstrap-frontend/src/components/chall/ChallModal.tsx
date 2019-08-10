import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import { closeChallModal } from '../../modules/chall';
import LabelInput from '../common/LabelInput';
import palette from '../../lib/styles/palette';
import { authChall } from '../../lib/api/chall';
import Alert from '../common/Alert';

const { useState } = React;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.16);
`;

const ChallModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40rem;
  padding: 2rem;

  background-color: white;

  .name,
  .points,
  .tag-list {
    text-align: center;
  }

  .name {
    font-size: 2em;
    margin: 0.5rem 0;
  }

  .points {
    font-size: 1.4em;
    margin: 0;
  }

  .tag-list {
    list-style: none;
    padding: 0;

    li {
      display: inline;
      margin: 0 0.3rem;
      padding: 0.2rem 0.3rem;
      border-radius: 5px;
      font-size: 0.9rem;

      background-color: ${palette.gray600};
      color: white;

      &.solved {
        background-color: ${palette.primary600};
      }
    }
  }
`;

const mapStateToProps = (state: RootState) => ({
  modalChall: state.chall.modalChall,
});

const mapDispatchToProps = { closeChallModal };

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
type ChallModalProps = OwnProps & StateProps & DispatchProps;

const ChallModal: React.FC<ChallModalProps> = ({
  modalChall,
  closeChallModal,
}) => {
  const [flag, setFlag] = useState('');
  const [authState, setAuthState] = useState('INITIAL');

  if (!modalChall) {
    return null;
  }

  const onSubmit = (e: React.FormEvent) => {
    authChall(modalChall.id, flag)
      .then(() => {
        setAuthState('SUCCESS');
      })
      .catch(() => {
        setAuthState('FAIL');
      });

    setFlag('');

    e.preventDefault();
  };

  const { name, points, description, author, tags, solved } = modalChall;

  return (
    <>
      <ModalOverlay
        onClick={() => {
          setFlag('');
          setAuthState('INITIAL');
          closeChallModal();
        }}
      />
      <ChallModalContainer>
        <h2 className="name">{name}</h2>
        <h3 className="points">{points}pts</h3>
        <ul className="tag-list">
          {tags.map((tag, index) => (
            <li key={index}>{tag.name}</li>
          ))}
          {solved && <li className="solved">Solved</li>}
        </ul>
        <p className="description">{description}</p>
        {author && <p className="author">Author: {author}</p>}
        <form onSubmit={onSubmit}>
          <LabelInput
            label="Flag"
            value={flag}
            onChange={e => setFlag(e.target.value)}
          />
        </form>
        {authState === 'SUCCESS' ? (
          <Alert color="primary">Correct!</Alert>
        ) : (
          authState === 'FAIL' && <Alert color="secondary">Incorrect!</Alert>
        )}
      </ChallModalContainer>
    </>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(ChallModal);

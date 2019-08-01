import * as React from 'react';
import styled from 'styled-components';
import { RootState } from '../../modules';
import { closeChallModal } from '../../modules/chall';
import { connect } from 'react-redux';
import palette from '../../lib/styles/palette';
import LabelInput from '../common/LabelInput';

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
  padding: 0 2rem;

  background-color: white;

  .title,
  .points,
  .tag-list {
    text-align: center;
  }

  .title {
    font-size: 2em;
    margin: 1.5rem 0 0.5rem 0;
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

  if (!modalChall) {
    return null;
  }

  const { title, points, description, author, tags } = modalChall;

  return (
    <>
      <ModalOverlay
        onClick={() => {
          setFlag('');
          closeChallModal();
        }}
      />
      <ChallModalContainer>
        <h2 className="title">{title}</h2>
        <h3 className="points">{points}pts</h3>
        <ul className="tag-list">
          {tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
        <p className="description">{description}</p>
        <hr />
        <LabelInput
          label="Flag"
          value={flag}
          onChange={e => setFlag(e.target.value)}
        />
        <p className="author">Author: {author}</p>
      </ChallModalContainer>
    </>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(ChallModal);
